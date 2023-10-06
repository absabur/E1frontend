import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating';


const ProductCard = ({product}) => {
  const options = {
    value: product.ratings,
    edit: false,
    color: "rgba(20, 45, 85, 0.2",
    activeColor: "tomato",
    isHalf: true
  };
  return (
    <Link key={product._id} className='productCard' to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name.slice(0, 20)}{product.name.slice(19,100)?"...": null}</p>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Rating size="small" value={product.ratings} precision={0.5} readOnly /> <span style={{margin: "2px"}}>{product.ratings && product.ratings.toFixed(1)}</span><span className='productCardSpan'>{product.numOfReviews} reviews</span>
      </div>
      <span>Price: ৳{product.price}</span>
    </Link>
  )
}

export default ProductCard