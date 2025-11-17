import { Layout, Menu, Button, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { HomeOutlined, ShoppingCartOutlined, UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import './Header.scss';

const { Header: AntHeader } = Layout;

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to="/home">Home</Link>,
    },
    {
      key: 'products',
      label: <Link to="/products">Productos</Link>,
    },
  ];

  if (isAuthenticated) {
    menuItems.push(
      {
        key: 'cart',
        icon: <ShoppingCartOutlined />,
        label: <Link to="/cart">Carrito</Link>,
      },
      {
        key: 'profile',
        icon: <UserOutlined />,
        label: <Link to="/profile">Perfil</Link>,
      }
    );
  }

  return (
    <AntHeader className="app-header">
      <div className="header-content">
        <div className="logo">
          <Link to="/home">🛒 Ecommerce</Link>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          items={menuItems}
          className="header-menu"
        />
        <Space className="header-actions">
          {isAuthenticated ? (
            <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button type="primary" icon={<LoginOutlined />} onClick={() => navigate('/login')}>
              Login
            </Button>
          )}
        </Space>
      </div>
    </AntHeader>
  );
}

export default Header;

