import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import MetaData from '../../component/layout/MetaData'
import "./Search.scss"

const Search = () => {

    const [keyword, setKeyword] = useState("")

    let navigate = useNavigate();

    const searchSubmitHandler = (e) =>{
        e.preventDefault()
        
        if(keyword.trim()){
            navigate(`/products/${keyword}`, { replace: true });
            
        }else{
            navigate(`/products/`, { replace: true });
        }
    }

  return (
    <>
    <MetaData title="ARAMA -- E-TİCARET" />
    <form onSubmit={searchSubmitHandler} className="searchBox">
        <input type="text" placeholder='Search a Product ...' onChange={(e)=>setKeyword(e.target.value)}/>
        <input type="submit" value="Search"/>
        </form>
    </>
  )
}

export default Search