import { Layout, Menu, Button, Badge } from 'antd';
import { HomeOutlined, ShoppingCartOutlined, UserOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/ProductContext/CartContext';
import { UserContext } from '../../context/AuthContext/UserState';
import { useState, useContext } from 'react';
import Login from '../Login';
import './Header.scss';

const { Header: AntHeader } = Layout;

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();
  const { isAuthenticated, logout } = useContext(UserContext);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: '/products',
      label: 'Productos',
    },
    {
      key: '/cart',
      icon: <Badge count={cart.length}><ShoppingCartOutlined /></Badge>,
      label: 'Carrito',
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: 'Perfil',
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <AntHeader className="app-header">
      <div className="header-content">
        <div className="logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          🛒 Ecommerce
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          items={menuItems}
          className="header-menu"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
        />
        <div className="header-actions">
          {isAuthenticated ? (
            <Button 
              type="primary" 
              icon={<LogoutOutlined />} 
              size="default"
              onClick={logout}
            >
              Logout
            </Button>
          ) : (
            <Button 
              type="primary" 
              icon={<LoginOutlined />} 
              size="default"
              onClick={() => setLoginModalOpen(true)}
            >
              Login
            </Button>
          )}
        </div>
      </div>
      {!isAuthenticated && (
        <Login open={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
      )}
    </AntHeader>
  );
}

export default Header;

