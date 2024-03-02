import { onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import TenantService from "./Services/TenantService";
import { Table } from "../../@/components/ui/table";
import RoomService from "./Services/RoomService";
import { Button } from "../../@/components/ui/button";

const ViewRequests = (props) => {
  console.log(props);
  const { roomId } = props;
  console.log(roomId);
  const [requests, setRequests] = useState([]);
  //console.log(requests)

  useEffect(() => {
    getAllRequests();
  }, []);

  const getAllRequests = () => {
    console.log(roomId);
    const q = query(TenantService.ref(), where("roomId", "==", roomId));
    onSnapshot(q, (snapshot) => {
      setRequests(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const handleAccept = async (request) => {
    //console.log(request);
    if (request.state !== "requested") {
      alert("Only applications in requested state can be accepted");
      return;
    }
    console.log(request.id);

    await TenantService.updateTenant(request.id, { state: "accepted" });
    await RoomService.updateRoom(request.roomId, { TenantId: request.id });
  };

  const handleReject = async (request) => {
    if (request.state === "requested") {
      const newData = Object.assign({}, request);
      const newState = "rejected";
      newData.state = newState;
      await TenantService.updateTenant(request.id, newData);
    }
  };

  return (
    <div>
      <>
        {roomId}
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>State</th>
              <th>RoomId</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((re) => {
              return (
                <tr>
                  <td>{re.id}</td>
                  <td>{re.userName}</td>
                  <td>{re.state}</td>
                  <td>{re.roomId}</td>

                  <td>
                    {re.state === "requested" && (
                      <Button
                        style={{ margin: "0 10px" }}
                        onClick={() => handleAccept(re)}
                      >
                        Accept
                      </Button>
                    )}
                    {re.state === "requested" && (
                      <Button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleReject(re)}
                      >
                        Reject
                      </Button>
                    )}
                    {re.state === "accepted" && <>Accepted</>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    </div>
  );
};

export default ViewRequests;
