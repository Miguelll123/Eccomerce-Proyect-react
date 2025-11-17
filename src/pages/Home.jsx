import { Card, Row, Col, Typography } from 'antd';
import { ShoppingOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import './Home.scss';

const { Title, Paragraph } = Typography;

function Home() {
  return (
    <div className="home-page">
      <div className="home-hero">
        <Title level={1}>Bienvenido a nuestra Tienda Online</Title>
        <Paragraph className="hero-description">
          Descubre los mejores productos al mejor precio
        </Paragraph>
      </div>

      <Row gutter={[24, 24]} className="features-section">
        <Col xs={24} sm={12} md={8}>
          <Card className="feature-card" hoverable>
            <ShoppingOutlined className="feature-icon" />
            <Title level={3}>Productos</Title>
            <Paragraph>Explora nuestra amplia gama de productos</Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="feature-card" hoverable>
            <ShoppingCartOutlined className="feature-icon" />
            <Title level={3}>Carrito</Title>
            <Paragraph>Agrega productos a tu carrito de compra</Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="feature-card" hoverable>
            <UserOutlined className="feature-icon" />
            <Title level={3}>Perfil</Title>
            <Paragraph>Gestiona tu cuenta y pedidos</Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;

