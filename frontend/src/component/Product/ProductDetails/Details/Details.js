import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addItemsToCart } from '../../../../redux/actions/cartAction'

import Rating from '../../../Rating/Rating'
import "./Details.scss"

const Details = ({ product }) => {

    const dispatch = useDispatch();

    const { id } = useParams()



    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;
        

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
      };
    


    return (
        <div>
            <div className="detailsBlock-1">
                <p>Product # {product._id}</p>
                <h2>{product.name}</h2>
            </div>
            <div className="detailsBlock-2">
                <Rating rating={product.rating} reviews={product.numOfReviews} />
            </div>
            <div className="detailsBlock-3">
                <h1>{`₺${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                        <button onClick={decreaseQuantity} className='decrease'>-</button>
                        <input readOnly value={quantity} onChange={()=>{}} type="number" />
                        <button onClick={increaseQuantity} className='increase'>+</button>
                    </div>
                    <button onClick={ addToCartHandler }>Sepete ekle</button>
                </div>
                <p>
                    Durum: <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                        {product.stock < 1 ? "Stoklar tükendi" : "Stokta var"}
                    </b>
                </p>
            </div>
            <div className="detailsBlock-4">
                Açıklama : <p>{product.description}</p>
            </div>
            <button className="submitReview">Yorum Gönder</button>
        </div>
    )
}

export default Details