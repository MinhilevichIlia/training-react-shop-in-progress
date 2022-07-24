import React from "react";
import "../App.css";



export default function BasketPage ({basketClickValue}) {
    console.log(basketClickValue)
    return(
        <div className="basketMainContent">
            {basketClickValue.map(element => (
                <div className="firstProducts">
                    <div className='wrapperName'>
                        <div className='name'>{element.title}</div>
                    </div>
                    <div className='wrapperPrice'>
                        <div className='price'>{element.price}</div>
                    </div>
                    <img src={element.image}></img>
                </div>
        ))}
        </div>)
}

