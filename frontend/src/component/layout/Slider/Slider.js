import { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "./Slider.scss";
import { v4 as uuid } from 'uuid';


const Slider = () => {

    const sliderData = [
        {
            image: "https://i.ibb.co/58Mq6Mb/slide1.jpg",
            heading: "Slide One",
            desc: "This is the description of slide one Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quos quas, voluptatum nesciunt illum exercitationem.",
        },
        {
            image: "https://i.ibb.co/8gwwd4Q/slide2.jpg",
            heading: "Slide Two",
            desc: "This is the description of slide two Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quos quas, voluptatum nesciunt illum exercitationem.",
        },
        {
            image: "https://i.ibb.co/8r7WYJh/slide3.jpg",
            heading: "Slide Three",
            desc: "This is the description of slide three Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quos quas, voluptatum nesciunt illum exercitationem.",
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const slideIndexLength = sliderData.length - 1

    let slideInterval;

    const nextSlide = () => setCurrentSlide(currentSlide === slideIndexLength ? 0 : currentSlide + 1);
    const prevSlide = () => setCurrentSlide(currentSlide === 0 ? slideIndexLength  : currentSlide - 1);

    const auto = () => slideInterval = setInterval(nextSlide, 5000);

    useEffect(() => {

        auto();

        return () => clearInterval(slideInterval);

    }, [currentSlide,slideInterval]);

    return (
        <div className="slider">
            <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
            <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
            {sliderData.map((slide, index) => {
                let unique_id = uuid();
                return (

                    index === currentSlide && (
                        <div className={index === currentSlide ? "slide current" : "slide"} key={unique_id.toString()}>
                            <img src={slide.image} alt="slide" className="image" />
                            <div className="content">
                                <h2>{slide.heading}</h2>
                                <p>{slide.desc}</p>
                                <hr />
                                <button className="--btn --btn-primary">Get Started</button>
                            </div>
                        </div>
                    )

                );
            })}
        </div>
    );
};

export default Slider;