import React from 'react'
import Rating from '../../../Rating/Rating'
import "./ReviewCard.scss"
import { v4 as uuid } from 'uuid';

const ReviewCard = ({ product }) => {

  const review = product.reviews && product.reviews.map(Item => {
     let unique_id = uuid();

    return <div className="reviewCard" key={unique_id.toString()} >
        <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" alt="" />
        <p>{Item.name}</p>
        <Rating rating={Item.rating} />
        <span>{Item.comment}</span>
      </div>
    
  }

  )

  return (
    <>
      {product.reviews && product.reviews[0] ? (
        <div className="reviews">{review}</div>
      ) : (
        <p className="noReviews">Henüz Yorum Yok</p>
      )}
    </>



  )
}

export default ReviewCard