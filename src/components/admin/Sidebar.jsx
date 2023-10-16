import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { AiOutlineArrowRight } from 'react-icons/ai';
import { AiOutlineArrowLeft } from 'react-icons/ai';
// import { AiOutlineHome } from 'react-icons/ai';
import './admin.css'

const Sidebar = () => {
    const [toggle, setToggle] = useState(true)
  return (
    <div onMouseOut={()=> setToggle(true)} onMouseOver={()=> setToggle(false)} className={`sideBar ${toggle ? null : "showBar"}`} >
        <button className='dashboard-toggle' onClick={()=> setToggle(!toggle)} style={toggle? {borderRadius: "0 50% 50% 0"}: {borderRadius:"50% 0 0 50%"} }>{toggle ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}</button>
        <section className='sideSection' style={{marginTop: "-40px", width: "100%"}}>
            <Link onClick={()=> setToggle(false)} style={{textAlign: "center", padding: "10px", fontSize: "1.3rem"}} to="/admin/dashboard">
                {/* <AiOutlineHome /> */}
                Admin Dashboard
            </Link>
        </section>
        <section className='sideSection'>
            <h3>Product</h3>
            <Link onClick={()=> setToggle(false)} to="/admin/products">All Product</Link>
            <Link onClick={()=> setToggle(false)} to="/admin/create/product">Create Product</Link>
        </section>
        <section className='sideSection'>
            <h3>Category</h3>
            <Link onClick={()=> setToggle(false)} to="/admin/categories">All Category</Link>
        </section>
        <section className='sideSection'>
            <h3>Users</h3>
            <Link onClick={()=> setToggle(false)} to="/admin/users">All Users</Link>
        </section>
        <section className='sideSection'>
            <h3>Orders</h3>
            <Link onClick={()=> setToggle(false)} to="/admin/orders">All Order</Link>
        </section>
        
    </div>
  )
}

export default Sidebar