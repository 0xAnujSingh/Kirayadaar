import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../../firebase";

const collectionName = "Rooms";
const roomCollectionRef = collection(db, collectionName);

class RoomService {
  ref = () => roomCollectionRef;

  addRoom = (colRef, newRoom) => {
    return addDoc(
      colRef,
      Object.assign({ roomCreatedAt: new Date() }, newRoom)
    );
  };

  updateRoom = (id, updatedRoom) => {
    const roomDoc = doc(db, "Rooms", id); // checking condition wheather the room is available or not
    return updateDoc(roomDoc, updatedRoom);
  };

  deleteRoom = (id) => {
    const roomDoc = doc(db, "Rooms", id);
    return deleteDoc(roomDoc);
  };

  getAllRooms = () => {
    return getDocs(roomCollectionRef);
  };

  getRoomById = (id) => {
    const roomDoc = doc(db, "Rooms", id);
    return getDoc(roomDoc);
  };
}

export default new RoomService();
