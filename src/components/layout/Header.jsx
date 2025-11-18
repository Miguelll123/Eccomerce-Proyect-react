import { Layout, Menu, Button } from 'antd';
import { HomeOutlined, ShoppingCartOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.scss';

const { Header: AntHeader } = Layout;

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

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
      icon: <ShoppingCartOutlined />,
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

