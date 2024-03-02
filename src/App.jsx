import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import NewRoom from "./components/NewRoom";
import ViewRooms from "./components/ViewRooms";
import PrivateRoutes from "./components/PrivateRoutes";
import AddNewTenant from "./components/AddNewTenant";
import Room from "./components/Room";
// import ViewRequests from "./components/ViewRequests";
// import FirebaseImageUpload from "./components/RoomImage/FirebaseImageUpload";
import UploadImage from "./components/RoomImages/UploadImage";
import RoomImage from "./components/RoomImages/ViewImage";
import CalenderDialog from "./components/CalenderDialog";

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    onAuthStateChanged(getAuth(), setUser);
  });

  if (user === undefined) {
    <p>Loading...</p>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes user={user} />}>
            <Route path="/" element={<ViewRooms />}></Route>
            <Route path="/rooms" element={<ViewRooms />}></Route>
            <Route path="/rooms/new" element={<NewRoom />}></Route>
            <Route path="/rooms/:id" element={<Room />}></Route>
            <Route path="/rooms/:id/tenant" element={<AddNewTenant />}></Route>
            {/* <Route
              path="/rooms/:id/requests"
              element={<ViewRequests />}
            ></Route> */}
          </Route>

          <Route path="login" element={<Login user={user} />}></Route>
          <Route path="signup" element={<Signup user={user} />}></Route>
          {/* <Route path="img" element={<FirebaseImageUpload />}></Route> */}
          <Route path="uploadimage" element={<UploadImage />}></Route>
          <Route path="roomimage" element={<RoomImage />}></Route>
          <Route path="dialog" element={<CalenderDialog />}></Route>
          <Route path="*" element={<div>Page not Found</div>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
