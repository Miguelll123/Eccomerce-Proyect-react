import { createContext, useContext, useReducer } from "react";
import cartReducer from "../CartReducer";

// Creamos el contexto 
const CartContext = createContext();

// Creamos el hook personalizado
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe usarse dentro de un CartProvider");
    }
    return context;
};

const initialState = {
    cart:[],
}

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (product) => {
        console.log('Agregando producto:', product);
        dispatch({
            type: 'ADD_TO_CART',
            payload: product
        });
    }

    return (
        <CartContext.Provider value={{
            cart: state.cart,
            addToCart
        }}>
            {children}
        </CartContext.Provider>
    );
}