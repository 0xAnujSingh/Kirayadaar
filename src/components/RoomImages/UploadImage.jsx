import React, { useState } from "react";
import { imageDb } from "../../firebase";
import { Button } from "../../../@/components/ui/button";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useOutletContext } from "react-router-dom";

const UploadImage = () => {
  const outlet = useOutletContext();
  const userId = outlet.user.uid;
  const [img, setImg] = useState("");

  const handleClick = () => {
    if (img !== null) {
      const imgRef = ref(imageDb, `files/${userId}/${v4()}`);
      uploadBytes(imgRef, img).then((value) => {
        getDownloadURL(value.ref);
        console.log("File uploaded");
      });
    } else {
      console.log("File is not uploaded");
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setImg(e.target.files[0])} />
      <Button onClick={handleClick}> Upload</Button>
    </div>
  );
};

export default UploadImage;
