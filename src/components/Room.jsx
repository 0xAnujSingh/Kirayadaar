import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../@/components/ui/card";
import { useOutletContext, useParams } from "react-router";
import RoomService from "./Services/RoomService";
import TenantService from "./Services/TenantService";
import AddNewTenant from "./AddNewTenant";
import ViewRequests from "./ViewRequests";
import { Button } from "../../@/components/ui/button";
import { collection, increment } from "firebase/firestore";
import { db } from "../firebase";
import TransactionService from "./Services/TransactionService";
import Transactions from "./Transactions";


export function RoomCard({ room }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Room</CardTitle>
        <small>{room.id}</small>
        <div>
          <small>RoomNo: </small>
          {room.roomNo}
        </div>
        <div>
          <small>Rent: </small>
          {room.rent}
        </div>
        <div>
          <small>Unit: </small>
          {room.unit}
        </div>
        <div>
          <small>Address: </small>
          {room.address}
        </div>
        <div>
          <small>Windows: </small>
          {room.windows}
        </div>
        <div>
          <small>Tenant: </small>
          {room.TenantId}
        </div>

        <div>
          <small>RoomSize: </small>
          {room.roomSize}
        </div>
      </CardHeader>
    </Card>
  );
}

function TenantCard({ tenant }) {
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Teanant</CardTitle>
        <small>{tenant.id}</small>
        <p>{tenant.userName}</p>
        <p>Balance: {tenant.balance}</p>
      </CardHeader>
    </Card>
  );
}

function RoomOwnerActions({ room, updateUnit, generateRent }) {
  function handleUpdateUnit() {
    const newUnit = Number(prompt("Enter New Unit"));
    if (newUnit <= room.unit) {
      alert("Unit cannot be less than or equal to existing unit");
      return;
    }
    return updateUnit(newUnit);
  }

  function handleGenerateRent() {
    return generateRent(1);
  }
  return (
    <div>
      <Button onClick={() => handleUpdateUnit()}>Update Unit</Button>&nbsp;
      <Button onClick={() => handleGenerateRent()}>Generate Rent</Button>
    </div>
  );
}

const Room = () => {
  const params = useParams();
  const [room, setRoom] = useState({});

  const [existingTenant, setExistingTenant] = useState();
 

  const outlet = useOutletContext();

  useEffect(() => {
    getRoomById(params.id);
  }, []);
  const getRoomById = async () => {
    const data = await RoomService.getRoomById(params.id);
    const tenantId = data.get("TenantId");
    if (tenantId) {
      const tenant = await TenantService.getTenantById(tenantId);
      setExistingTenant({ id: tenant.id, ...tenant.data() });
    }
    setRoom({ id: data.id, ...data.data() });
  };

  function isRoomOwner() {
    return room.owner === outlet.user.uid;
  }

  function isRoomTenant() {
    return (
      room.owner !== outlet.user.uid &&
      existingTenant &&
      existingTenant.userId === outlet.user.uid
    );
  }

  function TenantActions({ tenant }) {
    function handlePayBill() {
      const billAmount = Number(prompt("How much you want to pay"));
      if (billAmount <= 0) {
        alert("Balance must be greater than 0");
        return;
      }

      TenantService.updateTenant(tenant.id, {
        balance: increment(-1 * billAmount),
      });

      const dbRef = collection(db, "Transactions");
      const transaction = {
        item: "balance",
        quantity: 1,
        type: "Credit",
        price: billAmount,
        amount: billAmount,
        tenantId: existingTenant.id,
        tenantName: existingTenant.userName,
      };
      TransactionService.addTransaction(dbRef, transaction);
      getRoomById(params.id);
    }
    return (
      <div>
        <Button onClick={() => handlePayBill()}>Pay Bill</Button>
      </div>
    );
  }

  function generateRent(noOfMonths) {
    const newDate = existingTenant.rentPaidTill
      ? existingTenant.rentPaidTill.toDate()
      : existingTenant.dateOfJoining.toDate();

    newDate.setMonth(newDate.getMonth() + noOfMonths);

    TenantService.updateTenant(existingTenant.id, {
      rentPaidTill: newDate,
      balance: increment(room.rent * noOfMonths),
    });
    const dbRef = collection(db, "Transactions");
    const transaction = {
      item: "rent",
      quantity: noOfMonths,
      type: "Debit",
      price: room.rent,
      amount: room.rent * noOfMonths,
      tenantId: existingTenant.id,
      tenantName: existingTenant.userName,
    };
    TransactionService.addTransaction(dbRef, transaction);
    getRoomById(params.id);
  }

  function updateUnit(newUnit) {
    const newBalance = increment((newUnit - room.unit) * 10);
    TenantService.updateTenant(existingTenant.id, { balance: newBalance });
    RoomService.updateRoom(existingTenant.roomId, { unit: newUnit });

    const dbRef = collection(db, "Transactions");
    const quantity = newUnit - room.unit;
    const price = 10;
    const transaction = {
      item: "electricity",
      quantity: quantity,     
      type: "Debit",
      price: price,
      amount: quantity * price,
      tenantId: existingTenant.id,
      tenantName: existingTenant.userName,
    };
    TransactionService.addTransaction(dbRef, transaction);
    getRoomById(params.id);
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-3">
        
      </div>
      <div>
        <RoomCard room={room} />
        <br />
        {room.TenantId && <TenantCard tenant={existingTenant} />}

      </div>

      <div className="col-span-2">
        {!isRoomOwner() && !room.TenantId && <AddNewTenant />}

        {isRoomOwner() && !room.TenantId && <ViewRequests roomId={params.id} />}

        {room.TenantId && (
          <div>
            
            <Card>
              <CardHeader>
              <div className="flex flex-row align-middle">
              <CardTitle className="pb-0">
                Transactions
              </CardTitle>
              <div className="grow"></div>
              <div className="flex -mt-1">
                {isRoomTenant() && <TenantActions tenant={existingTenant} />}
                {isRoomOwner() && room.TenantId && (
                  <RoomOwnerActions
                    room={room}
                    updateUnit={(unit) => updateUnit(unit)}
                    generateRent={(months) => generateRent(months)}
                  />
                )}
              </div>
            </div>
              
              </CardHeader>
              <CardContent>
            <Transactions tenantId={room.TenantId} />
            </CardContent>
            </Card>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Room;
