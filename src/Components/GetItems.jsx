import React,{ useEffect, useState } from "react";
import "../App.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Offcanvas from 'react-bootstrap/Offcanvas';
import catalogLogo from '../assets/images/catalog.png'


function GetItemsComponent({product,setData,setProduct,filteringProducts,setBasketClickValue,basketClickValue}) {
    console.log(product)
    const [show,setShow] = useState(false);
    const [products,setProducts] = useState([]);
    const [currentProduct,setCurrentProduct] = useState();
    const [secondValueInput,setSecondValueInput] = useState();
    const [firstValueInput,setFirstValueInput] = useState();
    const [filterByPrice,setFilterByPrice] = useState([]);
    const [catalogShow,setCatalogShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const catalogClose = () => setCatalogShow(false);
    const catalogOpenShow = () => setCatalogShow(true);

    function clickAddProduct(el) {
        const coppyArrayAddProduct = [...basketClickValue];
        const currentIdProduct = coppyArrayAddProduct.find(element => {
            if(element.id == el.id) {
                return element
            }
        });


        
        const currentIndexProduct = coppyArrayAddProduct.findIndex(element => {
            if(element.id == el.id) {
                return element
            }
        });
        console.log(currentIndexProduct)
        if(currentIdProduct){
            coppyArrayAddProduct[currentIndexProduct] = {...currentIdProduct, count: coppyArrayAddProduct[currentIndexProduct].count + 1}
            console.log(currentIdProduct)
        }
        else {
            el.count = 1;
            coppyArrayAddProduct.push(el)
        }
        setBasketClickValue(coppyArrayAddProduct);
        localStorage.setItem('basketProduct',JSON.stringify(coppyArrayAddProduct));
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

    

    function filteringByPrice () {
        setFilterByPrice( products.filter(element => {
            if(element.price >= Number(firstValueInput) && element.price <= Number(secondValueInput)) {
                return element 
            }
        })
        )
    }
    function Example() {
        return (
        <>  
            <div className="wrapperCatalog">
                <span>Каталог</span>
                <img className="catalogLogo" src={catalogLogo}  onClick={catalogOpenShow}></img>
            </div>
        <Offcanvas show={catalogShow} onHide={catalogClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Каталог</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className="filterByPrice">
                    <div className="inputFilter">
                        <input className="firstValue" value={firstValueInput} onChange={(event) => setFirstValueInput(event.target.value)} /> 
                        <input className="secondValue" value={secondValueInput} onChange={(event) =>setSecondValueInput(event.target.value) }/>
                        <button   onClick={() => {filteringByPrice();catalogClose()}}>filter</button>
                    </div>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
        </>
        );}

    function getContent () {
        if(filterByPrice.length !== 0 ) {
            return (
                filterByPrice.map(element => (
                    <div className="firstProducts">
                        <img className="productImg"  onClick={() => clickModal(element)} src={element.image} />
                        <div className="mainContent">
                            <div className="tittle">{element.title}</div>
                            <div className="price">{element.price}$</div>
                            <Button variant="success" onClick={() => clickAddProduct(element)}>В корзину</Button>{' '}
                        </div>
                    </div>
                ))) }
                
        if(filteringProducts == undefined) {
            return(
            products.slice(0,product).map(element => (
                <div className="firstProducts">
                    <img className="productImg"  onClick={() => clickModal(element)} src={element.image} />
                    <div className="mainContent">
                        <div className="tittle">{element.title}</div>
                        <div className="price">{element.price}$</div>
                        <Button variant="success" onClick={() => clickAddProduct(element)}>В корзину</Button>{' '}
                    </div>
                </div>
            ))) 
        }
        if(filteringProducts !== undefined) {
            return (
                filteringProducts.map(element => (
                    <div className="firstProducts">
                        <div className="mainContent">
                            <img className="imgTittle" variant="top"  src={element.image} />
                            <div className="tittle">{element.title}</div>
                            <div className="price">{element.price} $</div>
                            <Button variant="success" onClick={() => clickAddProduct(element)}>В корзину</Button>{' '}
                        </div>
                    </div>
                )))
            }
    }

    return (
        <>
        {Example()}
        <div className="mainPageProducts">
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
                        <Button  onClick={() => clickAddProduct(currentProduct)} variant="primary">В корзину</Button>
                    </div>
                </Modal.Footer>
            </Modal>
            {getContent()}
            </div>
        </>)
};

const mapStateToProps = state => ({
    product: state.shop.countProducts,

})

export const GetItems = connect(mapStateToProps,null)(GetItemsComponent)



