import React, { useEffect, useState } from 'react'
import "./Loader.css";
import { useNavigate } from 'react-router-dom';

const LoadingPage = ({error}) => {
  const [time, settime] = useState(0)
  const navigate = useNavigate()
  if (error === "error") {
    navigate("/")
  }
  if (error === "universal") {
    setInterval(() => {
      settime(time=> time+1)
    }, 1000);
  }
  useEffect(() => {
    if (time >= 10){
      navigate('/')
    }
  }, [time])

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