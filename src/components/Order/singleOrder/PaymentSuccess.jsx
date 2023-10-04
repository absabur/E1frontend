import React from 'react'
import { Link } from 'react-router-dom'
import { FcPaid } from 'react-icons/fc';
import MetaDeta from '../../layout/MetaDeta';

const PaymentSuccess = () => {
  return (
    <div style={{height: "60vh", minHeight:"600px", width: "100%", padding: "1rem", backgroundColor: "var(--back)", display: "flex", flexDirection: "column",alignItems: "center", justifyContent: 'space-around'}}>
    <MetaDeta title="Payment Success" />
        <FcPaid style={{fontSize: '40px'}}/>
        <h1>Order On Process</h1>
        <Link className='v1button' style={{padding: '10px' , fontSize: "17px", width: '60%'}} to="/myorders">View Orders</Link>
    </div>
  )
}

export default PaymentSuccess