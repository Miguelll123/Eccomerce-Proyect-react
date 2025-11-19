const cart = (state,action) => {
    switch(action.type){
        case 'ADD_TO_CART':
            console.log('Estado del carrito:', [...state.cart, action.payload]);
            return {
                ...state,
                cart: [...state.cart, action.payload]
            };
        case 'CLEAR_CART':
            return {
                ...state,
                cart: []
            };
        default :
            return state;
    };

    
}


export default cart;