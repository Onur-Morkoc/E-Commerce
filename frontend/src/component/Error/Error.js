import React, { useEffect } from 'react'
import { BiErrorCircle } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import "./Error.scss"
import { useDispatch } from 'react-redux';

const Error = ({ error, clearErrors }) => {

  const dispatch = useDispatch()
  let errorStatus = error ? true : false

  const ErrorHandler = () => {

    errorStatus = false

    clearErrors && dispatch(clearErrors())

  }

  useEffect(() => {

    let errorTimeout = setTimeout(() => clearErrors && dispatch(clearErrors()), 5000)

    return () => !errorStatus && clearTimeout(errorTimeout)

  }, [dispatch, errorStatus, clearErrors])

  return (
    <div className='error'>
      <BiErrorCircle className='errorIcon' /> {error} <AiOutlineClose className="times" onClick={ErrorHandler} />
    </div>
  )
}

export default Error