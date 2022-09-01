import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {GetItems} from './Components/GetItems';
import {Header} from './Components/Header';
import BasketPage from './Components/BasketPage'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {setAllLenghtProducts,setProductSearch} from '../src/redux/actions/shop';


  function AppComponent({setAllLenghtProducts,productsSearch,setProductSearch}) {
    
    const [filteringProducts,setFilteringProducts] = useState();
    const [basketClickValue,setBasketClickValue] = useState([]);
    
    function setData(value){
      setAllLenghtProducts(value);
    }

    function setProduct(value){
      setProductSearch(value);
    }
    
    useEffect(() => {
      if(localStorage.getItem('basketProduct') !== null) {
        let product =  JSON.parse(localStorage.getItem('basketProduct'));
        setBasketClickValue(product)
      } 
    },[]);

  return(
    <BrowserRouter>
    <div>
      <Header 
        productSearch={productsSearch} 
        setFilteringProducts={setFilteringProducts} 
        basketClickValue={basketClickValue}
      />
      <div>
          <Routes>
            <Route path="/" element={
              <div className='wrapper'>
                <GetItems 
                  setProduct={setProduct}
                  setData={setData} 
                  filteringProducts={filteringProducts} 
                  setBasketClickValue={setBasketClickValue}
                  basketClickValue={basketClickValue}
                />
              </div>}>
            </Route>
            <Route path='/basket' element={
              <BasketPage
                basketClickValue={basketClickValue}
                setBasketClickValue={setBasketClickValue}
              />} 
            />
          </Routes>
          </div>
          </div>
        </BrowserRouter>

  )
}

const mapStateToProps = state => ({
  productsSearch: state.shop.productsSearch

})
const mapDispatchToProps = dispatch => bindActionCreators({
  setAllLenghtProducts: setAllLenghtProducts,
  setProductSearch: setProductSearch
},dispatch);
export const App = connect(mapStateToProps,mapDispatchToProps)(AppComponent);

