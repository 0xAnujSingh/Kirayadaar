import React, { useEffect, useState } from "react";
import { Card, CardTitle } from "../../@/components/ui/card";
import { Label } from "../../@/components/ui/label";
import { Form } from "../../@/components/ui/form";
import { Input } from "../../@/components/ui/input";
import { Button } from "../../@/components/ui/button";
import { db } from "../firebase";
import { collection, onSnapshot, query, where, and } from "@firebase/firestore";
import { useOutletContext, useParams } from "react-router";
import TenantService from "./Services/TenantService";
import RoomService from "./Services/RoomService";
import { Alert } from "../../@/components/ui/alert";

import ViewImage from "./RoomImages/ViewImage";

function ViewTenant({ tenant }) {
  return <p>{tenant.roomId}</p>;
}
const AddNewTenant = () => {
  const params = useParams();
  const outlet = useOutletContext();

  const [tenantData, setTenantData] = useState({
    dateOfJoining: "",
  });

  const [room, setRoom] = useState({});

  const [existingTenant, setExistingTenant] = useState();

  const changeHandler = (e) => {
    setTenantData({ ...tenantData, [e.target.name]: e.target.value });
  };

  const submitData = async () => {
    const { dateOfJoining } = tenantData;
    if (!dateOfJoining) {
      alert("Please fill the date");
    }
    const dbRef = collection(db, "TenantData");
    const newTenantData = tenantData;
    newTenantData.userName = outlet.user.displayName;
    newTenantData.userId = outlet.user.uid;
    newTenantData.roomId = params.id;
    newTenantData.dateOfJoining = new Date(
      Date.parse(tenantData.dateOfJoining)
    );
    newTenantData.state = "requested";
    await TenantService.addTenant(dbRef, tenantData)
      .then(() => {
        setTenantData({ dateOfJoining: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getRoomById(params.id);
    const dbRef = collection(db, "TenantData");
    const q = query(
      dbRef,
      and(
        where("roomId", "==", params.id),
        where("userId", "==", outlet.user.uid)
      )
    );
    onSnapshot(q, (snapshot) => {
      if (!snapshot.docs[0]) {
        setExistingTenant(null);
        return;
      }
      const req = snapshot.docs[0].data();

      req.id = snapshot.docs[0].id;
      setExistingTenant(req);
    });
  });
  const getRoomById = async () => {
    const data = await RoomService.getRoomById(params.id);

    setRoom(data.data());
  };
  return (
    <div className="w-full ">
      {/* {params.id} */}
      {!existingTenant && <ViewImage />}
<br/>
      {!existingTenant && (
        <Card className="w-60 p-5">
          <CardTitle >Apply to join</CardTitle>
          <Form>
            <Label>Date Of joining</Label>
            <Input
              name="dateOfJoining"
              placeholer="Date Of Joining"
              type="date"
              value={tenantData.dateOfJoining}
              onChange={changeHandler}
            />
          </Form>
          <Button onClick={submitData} style={{marginTop:"10px"}}>Submit</Button>
        </Card>
      )}

      {existingTenant && existingTenant.state === "requested" && (
        <Alert>Already {existingTenant.state}</Alert>
      )}
      {existingTenant && existingTenant.state === "accepted" && (
        <>
          <Alert>
            {" "}
            Living since {existingTenant.dateOfJoining.toDate().toDateString()}
          </Alert>
          <ViewTenant tenant={existingTenant} />
        </>
      )}
    </div>
  );
};

export default AddNewTenant;
