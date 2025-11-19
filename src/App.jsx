import { ConfigProvider, Card } from 'antd';
import esES from 'antd/locale/es_ES';
import Layout from './components/layout/Layout';
import './App.css';
import { ProductProvider } from './context/ProductContext/ProductContext';
import Products from './components/Products';
import { BrowserRouter,Route,Routes, Navigate } from 'react-router-dom';
import { CartProvider } from './context/ProductContext/CartContext';
import Cart from './components/Cart';

function App() {
  return (
    <BrowserRouter>
    <ConfigProvider locale={esES}>

      <ProductProvider>
        <CartProvider>
        <Layout>
       <Routes>
         
        <Route path='/products' element={<Products/>}/>
        <Route path= "/cart" element ={<Cart/>}/>
        
        </Routes> 
        
         </Layout>
         </CartProvider>
         </ProductProvider>
         </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
