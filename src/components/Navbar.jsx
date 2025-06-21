import React from 'react';
import  { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <nav>
        <Link to= "/">Home</Link>
        <Link to= "/ProductList">Product List</Link>
        <Link to= "/ProductDetail">Product Detail</Link>
        </nav>
    )
}


export default Navbar;