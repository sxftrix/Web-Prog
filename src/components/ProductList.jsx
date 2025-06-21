import React, { useState } from "react";


const ProductList = () => {
    const [products] = useState([
            {
                id: 1,
                name: "Sample Product",
                price: 100,
                description: "Short product description",
                imageUrl: "https://example.com/sample.jpg"
            }]);

    return (
        <div>
            <h2>
                Product List
            </h2>
            {products.map(product => (
                <ProductDetail key={product.id} product={product} />
            ))}
        </div>
    )
}

export default ProductList;