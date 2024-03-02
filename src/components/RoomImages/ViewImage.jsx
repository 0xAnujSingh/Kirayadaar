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
  CarouselNext,
} from "../../../@/components/ui/carousel";

const ViewImage = () => {
  const [imgUrl, setImgUrl] = useState([]);

  //   const handleClick = () => {

  //     getDownloadURL(value.ref).then((url) => {
  //       setImgUrl((data) => [...data, url]);
  //     });

  //   };

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
      <div className="max-w-xl mx-auto">
        <Carousel>
          <CarouselContent>
            {imgUrl.map((dataVal) => (
              <CarouselItem className="shadow-md border rounded-md h-96">
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