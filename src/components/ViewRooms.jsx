import { onSnapshot } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import RoomService from "./Services/RoomService";
import { Link } from "react-router-dom";
import { RoomCard } from "./Room";

const ViewRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getAllRooms();
  }, []);

  const getAllRooms = async () => {
    onSnapshot(RoomService.ref(), (snapshot) => {
      setRooms(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {rooms.map((room) => (
        <Link
          key={room.id}
          style={{ textDecoration: "none" }}
          to={`/rooms/${room.id}`}
        >
          <RoomCard room={room} />
        </Link>
      ))}
    </div>
  );
};

export default ViewRooms;
