import React, { useState } from "react";
import Prev from "../../assets/prev.png";
import Next from "../../assets/next.png";

export const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % children.length);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + children.length) % children.length);

  return (
    <div className="carousel-container w-[50%] flex items-center justify-center relative overflow-hidden ">
      <button
        onClick={prevSlide}
        className="prev-btn absolute left-[10%] z-10 w-10 w-10"
      >
        <img src={Prev} alt="" />
      </button>

      <div className="carousel w-full h-[27.375rem]  flex items-center justify-center relative">
        {React.Children.map(children, (child, index) => {
          const offset = index - currentIndex;

          // Adjust offset for circular carousel behavior
          const adjustedOffset =
            offset < -Math.floor(children.length / 2)
              ? offset + children.length
              : offset > Math.floor(children.length / 2)
              ? offset - children.length
              : offset;

          const isActive = adjustedOffset === 0;

          return (
            <div
              className={`carousel-item transition-transform duration-500 ease-in-out absolute mx-3`}
              style={{
                zIndex: isActive ? 1 : -1,
                transform: `translateX(${adjustedOffset * 50}%) scale(${
                  isActive ? 1 : 0.8
                })`,
                opacity: isActive ? 1 : 0.5,
                filter: `${isActive ? "" : "blur(4px)"}`,
              }}
              key={index}
            >
              {child}
            </div>
          );
        })}
      </div>

      <button
        onClick={nextSlide}
        className="next-btn absolute right-[10%] z-10 w-10"
      >
        <img src={Next} alt="img" />
      </button>
    </div>
  );
};
