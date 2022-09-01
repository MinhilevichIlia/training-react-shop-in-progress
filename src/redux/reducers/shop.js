const initialState = {
    countProducts : 3,
    allLenghtProducts:0,
    productsSearch:'',
};

export const shop = (state=initialState,action) => {
    switch(action.type) {
        case 'SET_COUNT_PRODUCTS': 
            return {
                ...state,
                countProducts: action.payload
            }
        case 'SET_ALL_LENGHT_PRODUCTS' :
            return {
                ...state,
                allLenghtProducts: action.payload
            }
        case 'SET_PRODUCTS_SEARCH' :
            return {
                ...state,
                productsSearch: action.payload
            }
        default:
            return state;
    }
}