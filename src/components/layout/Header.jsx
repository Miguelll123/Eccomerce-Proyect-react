import { Layout, Menu, Button } from 'antd';
import { HomeOutlined, ShoppingCartOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons';
import './Header.scss';

const { Header: AntHeader } = Layout;

function Header() {
  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: 'products',
      label: 'Productos',
    },
    {
      key: 'cart',
      icon: <ShoppingCartOutlined />,
      label: 'Carrito',
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Perfil',
    },
  ];

  return (
    <AntHeader className="app-header">
      <div className="header-content">
        <div className="logo">
          🛒 Ecommerce
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          items={menuItems}
          className="header-menu"
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

