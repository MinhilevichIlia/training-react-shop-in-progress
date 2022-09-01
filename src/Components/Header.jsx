import React from "react";
import logo from '../assets/images/LOGO.svg';
import Basket from './Basket'
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {setCountProducts} from '../redux/actions/shop'

function HeaderComponent({setProduct,allLenghtProducts,productSearch,setFilteringProducts,basketClickValue}) {

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
            <NavLink to='/'>
                <img className="logo" src={logo} alt=""/>
            </NavLink>
            <div  onClick={() => visibleProduscts()} className="products">
                Все продукты
            </div>
            <input  onChange={(event) => filtering(event)} className="searchProducts" type="text" placeholder="Поиск товара"/>
            <Basket basketClickValue={basketClickValue}>
            </Basket>
        </div>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({
    setProduct: setCountProducts
},dispatch);

const mapStateToProps = state => ({
    allLenghtProducts: state.shop.allLenghtProducts,
})

export const Header = connect(mapStateToProps,mapDispatchToProps)(HeaderComponent);