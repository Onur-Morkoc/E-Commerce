import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProduct } from '../../redux/actions/productAction'
import Loader from '../../component/Loader/Loader'
import ProductCard from '../../component/Product/ProductCard/ProductCard'
import "./Products.scss"
import { useParams } from 'react-router-dom'
import Error from '../../component/Error/Error'
import Pagination from "react-js-pagination"
import MetaData from '../../component/layout/MetaData'
import { v4 as uuid } from 'uuid';
const categories = [
  "Dizüstü Bilgisayar",
  "Ayakkabı",
  "Pantolon",
  "Gömlek",
  "Kıyafet",
  "Kamera",
  "Akıllı Telefonlar",
]
const Products = () => {

  const dispatch = useDispatch()

  const rangeRef = useRef(null)
  const inputLeftRef = useRef(null)
  const inputRightRef = useRef(null)

  const min = 0
  const max = 50000
  const priceCap = 0

  const [price, setPrice] = useState([0, 50000])
  const [currentPage, setCurrentPage] = useState(1)

  const [category, setCategory] = useState("")

  const [minValue, setMinValue] = useState(min)
  const [maxValue, setMaxValue] = useState(max)

  const { loading, products, productCount, error, filteredProductsCount, resultPerPage } = useSelector(state => state.products)
  const { keyword } = useParams()

  const setCurrentPageNo = (e) => setCurrentPage(e)

  const priceHandler = () => setPrice([minValue, maxValue])


  const handleMin = (e) => {

    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) > parseInt(maxValue)) {

      } else {
        setMinValue(parseInt(e.target.value))

      }
    } else {
      if (parseInt(e.target.value) < minValue) {
        setMinValue(parseInt(e.target.value))
      }
    }

  }

  const handleMax = (e) => {

    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) < parseInt(minValue)) {

      } else {
        setMaxValue((e.target.value))
      }
    } else {
      if (parseInt(e.target.value) > maxValue) {
        setMaxValue((e.target.value))
      }
    }

  }

  const options = {
    "activePage": currentPage,
    "itemsCountPerPage": resultPerPage,
    "totalItemsCount": productCount,
    "onChange": setCurrentPageNo,
    "nextPageText": "Sonraki",
    "prevPageText": "Önceki",
    "firstPageText": "Birinci",
    "lastPageText": "Son",
    "itemClass": 'page-item',
    "linkClass": 'page-link',
    "activeClass": 'pageItemActive',
    "activeLinkClass": 'pageLinkActive'
  }

  useEffect(() => {

    dispatch(getProduct(keyword, currentPage, price, category))
  }, [dispatch, keyword, currentPage, price, category])

  useEffect(() => {

    setTimeout(() => {

      if (error !== undefined) {
        console.log(error)
        rangeRef.current.style.left = ((minValue - min) / (max - min) * 100) + "%"
        rangeRef.current.style.right = (100 - ((maxValue - min) / (max - min) * 100)) + "%"
        if (minValue >= max - 100) inputLeftRef.current.style.zIndex = 5
        else inputLeftRef.current.style.zIndex = 2
        if (maxValue <= min + 100) inputRightRef.current.style.zIndex = 5
        else inputRightRef.current.style.zIndex = 2
      }



    }, 200);

  }, [maxValue, minValue, error])

  return (
    loading ? <Loader /> : (
      <>
        {error && <Error error={error} clearErrors={clearErrors} />}
        <MetaData title="ÜRÜNLER -- E-TİCARET" />
        <h2 className="productsHeading">Ürünler</h2>
        <div className="products">
          {products && products.map(product => <ProductCard key={product._id} product={product} />)}
        </div>

        {keyword && <div className="filterBox">
          <p>Fiyat</p>

          <div className="middle">
            <div className="multi-range-slider">
              <input onMouseUp={priceHandler} onChange={handleMin} type="range" id="input-left" ref={inputLeftRef} min={min} max={max} value={minValue} />
              <input onMouseUp={priceHandler} onChange={handleMax} type="range" id="input-right" ref={inputRightRef} min={min} max={max} value={maxValue} />

              <div className="range-slider">
                <div className="track"></div>
                <div className="range" ref={rangeRef}></div>
              </div>
            </div>
          </div>

          <p>Kategoriler</p>
          <ul className="categoryBox">

            {categories.map(category => {
              let unique_id = uuid();
              return <li className="category-link" key={unique_id.toString()} onClick={() => setCategory(category)}>
                {category}
              </li>
            }


            )}

          </ul>
        </div>
        }
        {resultPerPage < filteredProductsCount && (
          <div className="paginationBox">
            <Pagination {...options} />
          </div>
        )}


      </>
    )
  )
}

export default Products