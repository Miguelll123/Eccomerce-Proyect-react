import { createContext, useContext, useReducer,useEffect } from "react";
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

//LOCALSTORAGE

const carttt = ()=> {
    const storedcart = localStorage.getItem('cart');
    if (!storedcart || storedcart === "undefined") return [];
  try {
    return JSON.parse(storedcart);
  } catch {
    return [];
  }
};


const initialState = {
    cart: carttt(),
}

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    useEffect (()=>{
        localStorage.setItem('cart',JSON.stringify(state.cart));
    },[state.cart]);

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