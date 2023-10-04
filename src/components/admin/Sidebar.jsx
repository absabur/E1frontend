import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { AiOutlineArrowRight } from 'react-icons/ai';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineHome } from 'react-icons/ai';

const Sidebar = () => {
    const [toggle, setToggle] = useState(true)
  return (
    <div onMouseOut={()=> setToggle(true)} onMouseOver={()=> setToggle(false)} className={`sideBar ${toggle ? null : "showBar"}`}>
        <button onClick={()=> setToggle(!toggle)} style={{marginLeft: "250px", height: "40px", fontSize :"2rem"}}>{toggle ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}</button>
        <section className='sideSection' style={{marginTop: "-40px", width: "100%"}}>
            <Link style={{textAlign: "center", padding: "10px", fontSize: "1.3rem"}} to="/admin/dashboard">
                {/* <AiOutlineHome /> */}
                Dashboard
            </Link>
        </section>
        <section className='sideSection'>
            <h3>Product</h3>
            <Link to="/admin/products">All Product</Link>
            <Link to="/admin/create/product">New Product</Link>
        </section>
        <section className='sideSection'>
            <h3>Category</h3>
            <Link to="/admin/categories">All Category</Link>
        </section>
        <section className='sideSection'>
            <h3>Users</h3>
            <Link to="/admin/users">All Users</Link>
        </section>
        <section className='sideSection'>
            <h3>Orders</h3>
            <Link to="/admin/orders">All Order</Link>
        </section>
        
    </div>
  )
}

export default Sidebar