import React, { useEffect, useRef } from "react";
import myImg1 from "./images/a.jpg";
import myImg2 from "./images/b.jpg";
import myImg3 from "./images/c.jpg";

const Slider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;

    const moveSlide = () => {
      const max = slider!.scrollWidth - slider!.clientWidth;
      const left = slider!.clientWidth;

      if (max === slider!.scrollLeft) {
        slider!.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider!.scrollBy({ left, behavior: "smooth" });
      }

      setTimeout(moveSlide, 2000);
    };

    setTimeout(moveSlide, 4000);
  }, []);

  return (
    <div
      ref={sliderRef}
      className="md:w-[70vw] md:h-[70vh] sm:w-full h-auto lg:w-full lg:h-auto mx-auto overflow-hidden flex flex-nowrap text-center my-8"
    >
      <div className="text-white space-y-4 flex-none w-full flex flex-col items-center justify-center">
        <img
          src={myImg1}
          className="object-cover w-auto h-auto"
          alt="1stImage"
        />
      </div>
      <div className="text-white space-y-4 flex-none w-full flex flex-col items-center justify-center">
        <img
          src={myImg2}
          className="object-cover w-auto h-auto"
          alt="2stImage"
        />
      </div>
      <div className="text-white space-y-4 flex-none w-full flex flex-col items-center justify-center">
        <img
          src={myImg3}
          className="object-cover w-auto h-auto"
          alt="3stImage"
        />
      </div>
    </div>
  );
};

export default Slider;
