import React, { useEffect, useState } from "react";
import { imageDb } from "../../firebase";
import { Button } from "../../../@/components/ui/button";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "../../../@/components/ui/carousel";

const FirebaseImageUpload = () => {
  const [img, setImg] = useState("");
  const [imgUrl, setImgUrl] = useState([]);

  const handleClick = () => {
    if (img !== null) {
      const imgRef = ref(imageDb, `files/${v4()}`);
      uploadBytes(imgRef, img)
      .then((value) => {
        
        getDownloadURL(value.ref).then((url) => {
          setImgUrl((data) => [...data, url]);
        });
      });
    }
  };

  useEffect(() => {
    listAll(ref(imageDb, "files")).then((imgs) => {
      console.log(imgs);
      imgs.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          setImgUrl((data) => [...data, url]);
        });
      });
    });
  }, []);
  

  return (
    <div className="App">
      <input type="file" onChange={(e) => setImg(e.target.files[0])} />
      <Button onClick={handleClick}> Upload</Button>
      <br />

      <div className="max-w-xl mx-auto">
      <Carousel>
        <CarouselContent>
          {imgUrl.map((dataVal) => (
            <CarouselItem className="shadow-md border rounded-md h-96">
              <img src={dataVal} className="w-full h-full object-cover object-center" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
  <CarouselNext />
      </Carousel>
      </div>
    </div>
  );
};

export default FirebaseImageUpload;
