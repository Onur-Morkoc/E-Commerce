import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { clearErrors, getProductDetails } from '../../redux/actions/productAction'
import "./ProductDetails.scss"
import Carousel from "../../component/Product/ProductDetails/Carousel/Carousel"
import ReviewCard from '../../component/Product/ProductDetails/ReviewCard/ReviewCard'
import Loader from '../../component/Loader/Loader'
import Details from '../../component/Product/ProductDetails/Details/Details'
import Error from '../../component/Error/Error'
import MetaData from '../../component/layout/MetaData'

const ProductDetails = () => {
    const dispatch = useDispatch()

    const { id } = useParams()

    const { loading, product, error, } = useSelector(state => state.productDetails)
    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch, id])

    return (
        loading ? <Loader /> : (
            <>
            <MetaData title="ÜRÜN DETAYI -- E-TİCARET" />
                {error && <Error error={error} clearErrors={clearErrors}/>}
                <div className="productDetails">
                    <div className='ımage'>
                        {product.images && <Carousel images={product.images} />}
                    </div>
                    <Details product={product} />
                </div>

                <h3 className="reviewsHeading">YORUMLAR</h3>
                <ReviewCard product={product} />
            </>
        )
    )
}

export default ProductDetails