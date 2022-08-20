import React from 'react'
import { IoIosStar, IoIosStarOutline, IoIosStarHalf } from "react-icons/io";
import "./Rating.scss"

const Rating = ({ rating, reviews }) => {

    const star = {
        Full: <IoIosStar className='star' />,
        Half: <IoIosStarHalf className='star' />,
        Outline: <IoIosStarOutline className='star' />,
    }

    return (
        <>
            <div>
                {rating >= 1 ? star.Full : rating >= 0.5 ? star.Half : star.Outline}
                {rating >= 2 ? star.Full : rating >= 1.5 ? star.Half : star.Outline}
                {rating >= 3 ? star.Full : rating >= 2.5 ? star.Half : star.Outline}
                {rating >= 4 ? star.Full : rating >= 3.5 ? star.Half : star.Outline}
                {rating >= 5 ? star.Full : rating >= 4.5 ? star.Half : star.Outline}
            </div>
            {reviews !==undefined && <span>({ reviews } Yorum)</span>}
            
        </>
    )
}

export default Rating