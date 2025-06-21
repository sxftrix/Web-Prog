import React from "react";
import { Link } from 'react-router-dom;'


function ProductCard({product}){
    return(
        <div>
            <img src={product.imageUrl} alt={product.name}/>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <Link to={'/products/${product.id'} >view details</Link>
    </div>

    )
}
export default ProductCard;