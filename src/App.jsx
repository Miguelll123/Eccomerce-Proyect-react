import { ConfigProvider, Card } from 'antd';
import esES from 'antd/locale/es_ES';
import Layout from './components/layout/Layout';
import './App.css';
import { ProductProvider } from './context/ProductContext/ProductContext';
import Products from './components/Products';
import { BrowserRouter,Route,Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <ConfigProvider locale={esES}>

      <ProductProvider>
        <Layout>
       <Routes>
        <Route path='/' element={<Navigate to="/products" replace />}/>
        <Route path='/products' element={<Products/>}/>
        
        </Routes> 
        
         </Layout>
         </ProductProvider>
         </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
