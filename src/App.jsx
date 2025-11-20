import { ConfigProvider, Card } from 'antd';
import esES from 'antd/locale/es_ES';
import Layout from './components/layout/Layout';
import './App.css';
import { ProductProvider } from './context/ProductContext/ProductContext';
import Products from './components/Products';
import { BrowserRouter,Route,Routes, Navigate } from 'react-router-dom';
import { CartProvider } from './context/ProductContext/CartContext';
import Cart from './components/Cart';
import { UserProvider, UserContext } from './context/AuthContext/UserState';
import Login from './components/Login';
import { useContext } from 'react';

// Componente interno que usa el Context (debe estar dentro del UserProvider)
function AppContent() {
  const { isAuthenticated } = useContext(UserContext);

  // Si NO está autenticado → mostrar Login (sin Layout, sin rutas)
  if (!isAuthenticated) {
    return <Login />;
  }

  // Si SÍ está autenticado → mostrar Layout normal con rutas
  return (
    <BrowserRouter>
      <ProductProvider>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Products/>}/>
              <Route path='/products' element={<Products/>}/>
              <Route path= "/cart" element ={<Cart/>}/>
            </Routes> 
          </Layout>
        </CartProvider>
      </ProductProvider>
    </BrowserRouter>
  );
}

function App() {
  return (
    <ConfigProvider locale={esES}>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ConfigProvider>
  );
}

export default App;
