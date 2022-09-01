import React from "react";
import "../App.css";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function BasketPage ({basketClickValue,setBasketClickValue}) {

    function deleteProduct (element){
        let coppyBasket = [...basketClickValue];
        coppyBasket = coppyBasket.filter(el => {
            if(el.id !== element.id) {
                return true
            }
        })
        console.log(coppyBasket)
        setBasketClickValue(coppyBasket);
        console.log(basketClickValue)
        localStorage.setItem('basketProduct',JSON.stringify(coppyBasket))
    }
    console.log(basketClickValue)
    return(
        <div className="basketMainContent">
            {basketClickValue.map(element => (
                <div className="firstProducts">
                    <div className="count">
                        Count : {element.count}
                    </div>
                    <div className='wrapperName'>
                        <div className='name'>{element.title}</div>
                    </div>
                    <div className='wrapperPrice'>
                        <div className='price'>{element.price * element.count}$</div>
                    </div>
                    <img src={element.image}></img>
                    <Button variant="secondary" onClick={() => deleteProduct(element)}>Удалить товар </Button>
                </div>
                
        ))}
        </div>)
}











