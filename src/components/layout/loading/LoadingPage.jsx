import React from 'react'
import "./Loader.css";
import { useNavigate } from 'react-router-dom';

const LoadingPage = ({error}) => {
  const navigate = useNavigate()
  if (error === "error") {
    navigate("/")
  }
  return (
    <div className="loading">
      <div className='outside'></div>
      <div className="inside"></div>
      <div className="dot1"></div>
      <div className="dot2"></div>
    </div>
  )
}

export default LoadingPage