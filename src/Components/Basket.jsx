import React from "react";
import "../App.css";
import Header from "./Header";
import basket from '../assets/images/basket.svg';


export default function Basket({basketClickValue}) {
    
return (<a className="basket">
            <div className="counterBasketProduct">{basketClickValue.length}</div>
            <img className="basketImg" src={basket} alt="" />
        </a>)
}