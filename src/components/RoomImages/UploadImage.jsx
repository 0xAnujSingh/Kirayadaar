import React, { useState } from "react";
import { imageDb } from "../../firebase";
import { Button } from "../../../@/components/ui/button";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const UploadImage = () => {
  const [img, setImg] = useState("");

  const handleClick = () => {
    if (img !== null) {
      const imgRef = ref(imageDb, `files/${v4()}`);
      uploadBytes(imgRef, img).then((value) => {
        getDownloadURL(value.ref);
        // .then((url) => {
        //   setImgUrl((data) => [...data, url]);
        // });
      });
    }
    if (img == null) {
      return;
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
