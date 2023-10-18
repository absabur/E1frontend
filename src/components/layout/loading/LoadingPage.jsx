import React from 'react'
import "./Loader.css";

const LoadingPage = () => {
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