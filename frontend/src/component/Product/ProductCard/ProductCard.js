import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '../../Rating/Rating'
import "./ProductCard.scss"

const ProductCard = ({product}) => {
  return (
    
    <Link className="productCart" to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
            <Rating rating={product.rating}  reviews={product.numOfReviews}/>
        </div>
        <span className='price'>{`₺${product.price}`}</span>
    </Link>

  )
}

export default ProductCard