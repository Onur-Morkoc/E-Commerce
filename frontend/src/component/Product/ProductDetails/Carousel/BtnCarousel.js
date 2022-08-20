import React from "react";
import "./Carousel.scss";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const BtnCarousel = ({ direction, moveSlide }) => {
  
  return (
    <button
      onClick={moveSlide}
      className={direction === "product-next" ? "product-btn-slide product-next" : "product-btn-slide product-prev"}
    >
      {direction === "product-next" ? <AiOutlineRight /> : <AiOutlineLeft />}
    </button>
  );
}

export default BtnCarousel