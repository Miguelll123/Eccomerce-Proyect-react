const cart = (state,action) => {
    switch(action.type){
        case 'ADD_TO_CART':
            console.log('Estado del carrito:', [...state.cart, action.payload]);
            return {
                ...state,
                cart: [...state.cart, action.payload]
            };
            default :
            return state;
    }
}


export default cart;