import { createContext,useContext,useState,useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";

// Creamos el contexto 
const ProductContext = createContext();

// Creamos el hook personalizado

export const useProducts= ()=> {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProducts debe usarse dentro de un ProductProvider");
    }
    return context;
};

// Creamos el provider 

export const ProductProvider = ({children})=> {
    // ESTADOS
    const [products,setProducts]= useState([]);
    const [loading,setloading]= useState(true);
    const [error,setError]= useState(null);


  // Funciones para obtener productos 
  const getProducts = async ()=> {
    try {
    setloading(true);
    setError(null);
    const response = await axios.get(`${API_BASE_URL}/products`, {withCredentials: true});
    setProducts(response.data)
    } catch(error){
        setError(error.response?.data?.message || error.message || 'Error al cargar los productos')
    } finally {
        setloading(false);
    }
  };


  // Cargar productos al montar 
  useEffect(()=> {
    getProducts();
  },[]);

  // VAlores que se comparten 
  const value = {
    products,
    loading,
    error,
    getProducts,
  };


  return (
    <ProductContext.Provider value={value}>
        {children}
    </ProductContext.Provider>
  );
};