import React from 'react'
import "./About.css"
import hell from "../../images/logo.png"

const About = () => {
  return (
    <div style={{width: "100%",maxWidth: '100vw', height: "70vh", minHeight: "700px"}}>
      <iframe style={{width: "100%", height: "100%"}} id="iFrameExample"
          src="https://absabur.pro">
      </iframe>

      {/* <div style={{backgroundColor: "rgba(175, 175, 175, 0.455)",padding: "20px",width: "100vw"}}>
        <h2 style={{fontSize: "30px", fontWeight: "700", textAlign: "center", color: "#34eb34"}}>Hello name</h2>
        <p style={{fontSize:"22px", textAlign: "center"}}>This is a Email verification. We got a request to change email from this email. <br /> If you are not this requested person then ignore this email.</p>
        <a style={{backgroundColor: "#34eb34", color: "black", fontWeight: "700", padding: "5px 10px", textDecoration: "none"}} href="${process.env.clientUrl}/mail-update/${token}" target="_blank">Click here </a>
        <p style={{textAlign: "center", fontSize: "18px"}}>to update email.</p>
        <b style={{color: "red", fontSize: "18px", textAlign: "center"}}>This email will expires in <span style={{color: "black"}}>$time</span>, Update your email before <span style={{color: "black"}}>$time</span></b>
        <img width={200} height={200} style={{margin: "1rem"}} src={hell} alt="" />
      </div> */}
      

    </div>
  )
}

export default About