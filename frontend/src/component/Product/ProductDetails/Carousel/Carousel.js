import React, { useState } from 'react'
import './Carousel.scss'
import BtnCarousel from './BtnCarousel'
import { v4 as uuid } from 'uuid';
const Carousel = ({ images }) => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const slideIndexLength = images.length - 1

    const nextSlide = () => setCurrentSlide(currentSlide === slideIndexLength ? 0 : currentSlide + 1);
    const prevSlide = () => setCurrentSlide(currentSlide === 0 ? slideIndexLength : currentSlide - 1);

    const moveDot = index => setCurrentSlide(index)

    return (
        <div className="product-container-slider ">
            {images.map((obj, index) => {
                let unique_id = uuid();
                return (
                    <div key={unique_id.toString()} className={currentSlide === index ? "product-slide product-active-anim" : "product-slide pr"}>
                        <img src={obj.url} alt={obj.url} />
                    </div>
                )
            })}
            {images.length > 1 && <BtnCarousel moveSlide={nextSlide} direction={"product-next"} />}
            {images.length > 1 && <BtnCarousel moveSlide={prevSlide} direction={"product-prev"} />}

            <div className="product-container-dots">
                {images.length > 1 && images.map((obj, index) => {
                    let unique_id = uuid();
                    return <div
                        key={unique_id.toString()}
                        onClick={() => moveDot(index)}
                        className={currentSlide === index ? "product-dot product-active" : "product-dot"}
                    />
                })}
            </div>
        </div>
    )
}

export default Carousel;