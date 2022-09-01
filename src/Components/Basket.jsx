import React from "react";
import "../App.css";
import Header from "./Header";
import basket from '../assets/images/basket.svg';
import { NavLink } from "react-router-dom";





export default function Basket({basketClickValue}) {
    
return (<NavLink  to='basket' className="basket">
            <div className="counterBasketProduct">{basketClickValue.length}</div>
            <img className="basketImg" src={basket} alt="" />
        </NavLink>)
}