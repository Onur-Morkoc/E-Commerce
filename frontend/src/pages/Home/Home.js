import React, { useEffect } from 'react'
import Slider from '../../component/layout/Slider/Slider'
import ProductCard from '../../component/Product/ProductCard/ProductCard'
import './Home.scss'
import MetaData from '../../component/layout/MetaData'
import { clearErrors, getProduct } from '../../redux/actions/productAction'
import { useDispatch, useSelector } from "react-redux"
import Loader from '../../component/Loader/Loader'
import Error from '../../component/Error/Error'

const Home = () => {
  const dispatch = useDispatch()

  const { loading, products, productCount, error, } = useSelector(state => state.products)

  useEffect(() => {
    dispatch(getProduct())
  }, [dispatch])

  return (
    loading ? <Loader /> :
      <>
        {error && <Error error={error} clearErrors={clearErrors}/>}
        <MetaData title="E-TİCARET" />
        <Slider />
        <h2 className="homeHeading">Öne Çıkan Ürünler</h2>
        <div className="container">
          {products && products.map(product => <ProductCard product={product} key={product._id} />)}
        </div>

      </>
  )
}

export default Home