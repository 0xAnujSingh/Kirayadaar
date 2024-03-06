import React, { useEffect, useState } from "react";
import { Button } from "../../@/components/ui/button";
import { collection } from "@firebase/firestore";
import RoomService from "./Services/RoomService";
import { db } from "../firebase";
import { useOutletContext } from "react-router";
import { toast } from "react-toastify";
import { onSnapshot } from "@firebase/firestore";
import UploadImage from "./RoomImages/UploadImage";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { imageDb } from "../firebase";

const NewRoom = () => {
  const outlet = useOutletContext();
  const [img, setImg] = useState("");
  const [room, setRoom] = useState({
    roomNo: "",
    rent: "",
    unit: "",
    address: "",
    windows: "",
    roomSize: "",
  });

  const onChangeHandler = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    const { roomNo, rent, unit, address, windows, roomSize } = room;
    if ((roomNo, rent, unit, address, windows, roomSize)) {
      const dbRef = collection(db, "Rooms");

      const newRoom = room;

      newRoom.unit = Number(room.unit);
      newRoom.rent = Number(room.rent);
      newRoom.owner = outlet.user.uid;

      await RoomService.addRoom(dbRef, room)
        .then((docRef) => {
          setRoom({
            roomNo: "",
            rent: "",
            unit: "",
            address: "",
            windows: "",
            roomSize: "",
          });
          console.log(img);
          if (img !== null) {
            const imgRef = ref(imageDb, `files/${docRef.id}/${v4()}`);
            uploadBytes(imgRef, img).then((value) => {
              getDownloadURL(value.ref);
              console.log("File uploaded");
            });
          } else {
            console.log("File is not uploaded");
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } else {
      console.log("please fill the full form");
    }
    // toast("Your data is successfull submitted");
  };

  return (
    <div className="w-full max-w-xs mx-auto space-y-4">
      <h1 className="text-center text-xl font-semibold">Create New Room</h1>
      <p className="text-gray-600 text-sm text-center">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry
      </p>

      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={submitData}
      >
        <div className="mb-4">
          {/* <p>welcome... {outlet.user.displayName}</p> */}
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="roomNo"
          >
            Room No
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="roomNo"
            placeholder="RoomNo"
            type="number"
            value={room.roomNo}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="rent"
          >
            Rent
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="rent"
            placeholder="Rent"
            type="number"
            value={room.rent}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="unit"
          >
            Unit
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="unit"
            placeholder="Unit"
            type="number"
            value={room.unit}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address"
          >
            Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="address"
            placeholder="Address"
            type="text"
            value={room.address}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="windows"
          >
            Windows
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="windows"
            placeholder="Windows"
            type="text"
            value={room.windows}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="roomSize"
          >
            Room Size
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="roomSize"
            placeholder="RoomSize"
            type="text"
            value={room.roomSize}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <p>Room Image</p>
          <input type="file" multiple onChange={(e) => setImg(e.target.files[0])} />
          
        </div>

        <br />
        <Button onClick={submitData}>Submit</Button>
      </form>
      <div>
        {/* <p>Room Image</p> */}
        {/* <UploadImage /> */}
      </div>
    </div>
  );
};

export default NewRoom;
