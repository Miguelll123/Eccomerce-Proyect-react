import { Layout, Menu, Button, Badge } from 'antd';
import { HomeOutlined, ShoppingCartOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/ProductContext/CartContext';
import './Header.scss';

const { Header: AntHeader } = Layout;

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();

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
          <Button type="primary" icon={<LoginOutlined />} size="default">
            Login
          </Button>
        </div>
      </div>
    </AntHeader>
  );
}

export default Header;

