import React, { useContext } from 'react'
import "./Contact.css"
import copy from "copy-to-clipboard";

import { BsFillTelephoneOutboundFill } from 'react-icons/bs';
import GlobalState from '../../GlobalState';

const Contact = () => { 
    const {setMsg} = useContext(GlobalState)
    const handleCopyText = (text) => {
        copy(text);
        setMsg(`You have copied "${text}"`);
    };
  return (
    <div className='contact-section'>
        <h1 style={{margin: "1rem 10px"}}>Contact us</h1>
        <div className="allcontact">
            <div className='cell-contact'>
                <h2 className="cell-number" onClick={(e) => handleCopyText(e.currentTarget.innerHTML)}>01773277050</h2>
                <a href="tel:+8801773277050" className='v2button call-now'>Call Now<BsFillTelephoneOutboundFill /></a>
            </div>
            <form action="mailto:absabur929@gmail.com" method="post" enctype="text/plain" className="email-contact">
                <h2 style={{textAlign: "center"}}>Send Email</h2>
                <div className="name">
                    <label htmlFor="name">Name : </label>
                    <input required type="text" id='name' name='Name' placeholder='Enter Your Name'/>
                </div>
                <div className="mobile">
                    <label htmlFor="mobile">Number : </label>
                    <input required type="text" id='mobile' name='Mobile' placeholder='Enter Contact Number'/>
                </div>
                <div className="subject">
                    <label htmlFor="subject">Subject : </label>
                    <input type="text" id='subject' name='Subject' placeholder='Subject'/>
                </div>
                <div className="message">
                    <label htmlFor="message">Message : </label>
                    <textarea required rows={10} id='message' name='Message' placeholder='Message'></textarea>
                </div>
                <div className="send">
                    <button type='reset' className='v1button send-mail'>Reset</button>
                    <button type='submit' className='v2button send-mail'>Send</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Contact