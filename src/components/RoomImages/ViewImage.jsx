import React, { useEffect, useState } from "react";
import { imageDb } from "../../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../../../@/components/ui/carousel";

const ViewImage = ({ roomId }) => {
  const [imgUrl, setImgUrl] = useState([]);

  function listImages() {
    listAll(ref(imageDb, `files/${roomId}`)).then((imgs) => {
      //console.log(imgs);
      imgs.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          setImgUrl((data) => [...data, url]);
        });
      });
    });
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      listImages();
    }, 5000);
    return ()=>{
      clearTimeout(timer)
    }
  }, []);

  return (
    <div className="App">
      <div className=" mx-auto">
        <Carousel>
          <CarouselContent>
            {imgUrl.map((dataVal, index) => (
              <CarouselItem
                className="basis-1/3 shadow-md border rounded-md h-96 "
                key={index}
              >
                <img
                  src={dataVal}
                  className="w-full h-full object-cover object-center"
                />
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

export default ViewImage;
