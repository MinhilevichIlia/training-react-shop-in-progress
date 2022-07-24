import React from "react";
import logo from '../assets/images/LOGO.svg';
import basket from '../assets/images/basket.svg';
import { useState } from "react";
import Basket from './Basket'



export default function Header({setProduct,allLenghtProducts,productSearch,setFilteringProducts,basketClickValue}) {

    function visibleProduscts() {
        setProduct(allLenghtProducts);
    }

    function filtering (event) {
        const filteringProducts =  productSearch.filter(element => {
            console.log(element.title)
            return element.title.toLowerCase().includes(event.target.value.toLowerCase())
        })
            setFilteringProducts(filteringProducts);
        };

    console.log(basketClickValue.length)

    return(
        <div className="header">
            <img className="logo" src={logo} alt=""/>
            <div onClick={() => visibleProduscts()} className="products">
                ALL PRODUCTS
            </div>
            <input  onChange={(event) => filtering(event)} className="searchProducts" type="text" placeholder="product search"/>
            <Basket basketClickValue={basketClickValue}>
            </Basket>
        </div>
    )
}