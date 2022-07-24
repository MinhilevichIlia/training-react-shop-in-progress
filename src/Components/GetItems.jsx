import React,{ useEffect, useState } from "react";
import "../App.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';


export default function GetItems({product,setData,setProduct,filteringProducts,setBasketClickValue,basketClickValue}) {
    const [show,setShow] = useState(false);
    const [products,setProducts] = useState([]);
    const [currentProduct,setCurrentProduct] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function  clickCurrentProduct (){
        const copyArray = [...basketClickValue] ;
        copyArray.push(currentProduct);
        setBasketClickValue(copyArray);
        localStorage.setItem('basketProduct',JSON.stringify(copyArray));
    }

    function clickModal(el) {
        setCurrentProduct(el);
        handleShow();
    }

    useEffect(() => {
        if(localStorage.getItem('items') !== null){
            let item =  JSON.parse(localStorage.getItem('items'));
            setProducts(item);
            setProduct(item);
            setData(item.length);
        } else {
        fetch ("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => {
            setProducts(data)
            setData(data.length);
            setProduct(data);
            localStorage.setItem('items',JSON.stringify(data));
        }
        )};
    },[]);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{currentProduct?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modalInfo">
                        {currentProduct?.price}
                        <img src={currentProduct?.image}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="test">
                        <Button variant="secondary" onClick={handleClose}>Закрыть</Button>
                        <Button  onClick={(event) => clickCurrentProduct()} variant="primary">В корзину</Button>
                    </div>
                </Modal.Footer>
            </Modal>

            {filteringProducts == undefined ? (products.slice(0,product).map(element => (
                    <div className="firstProducts">
                        <img  onClick={() => clickModal(element)} src={element.image} />
                        <div className="mainContent">
                            <div className="tittle">{element.title}</div>
                            <div className="price">{element.price}$</div>
                            <Button variant="primary">В корзину</Button>
                        </div>
                    </div>
                ))) : (filteringProducts.map(element => (
                    <div className="firstProducts">
                        <div className="mainContent">
                            <img className="imgTittle" variant="top"  src={element.image} />
                            <div className="tittle">{element.title}</div>
                            <div className="price">{element.price} $</div>
                            <Button  variant="primary">В корзину</Button>
                        </div>
                        
                    </div>
                ))    )
            } 
        </>)
};




