import React from "react";
import { useParams } from "react-router-dom";

function ProductDetail(){
    const {id} = useParams();
    const product = {
        id: 1,
        name: "Sample Product",
        price: 100,
        description: "Short product description",
        imageUrl: "https://example.com/sample.jpg"
    }

    return(
        <div>
            <h2>
                {product.name}
            </h2>
            <img src={product.imageUrl} alt={product.name} />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
        </div>
    )
}

export default ProductDetail;