import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import GetItems from './Components/GetItems';
import Header from './Components/Header';
import Basket from './Components/Basket';
import BasketPage from './Components/BasketPage'
  function App() {
    
    const [countProducts , setCountProducts] = useState(3);
    const [allLenghtProducts,setAllLenghtProducts] = useState();
    const [productsSearch,setProductSearch] = useState();
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
    <div>
      <Header 
        productSearch={productsSearch} 
        setProduct={setCountProducts}
        allLenghtProducts={allLenghtProducts} 
        setFilteringProducts={setFilteringProducts} 
        basketClickValue={basketClickValue}
      />
      <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <div className='wrapper'>
                <GetItems 
                  setProduct={setProduct}
                  product={countProducts}
                  setData={setData} 
                  filteringProducts={filteringProducts} 
                  setBasketClickValue={setBasketClickValue}
                  basketClickValue={basketClickValue}
                />
              </div>}>
            </Route>
            <Route path='basket' element={
              <BasketPage
                basketClickValue={basketClickValue}
              />} 
            />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;
