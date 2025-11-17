import { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Spin, Button, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Products.scss';

const { Title } = Typography;
const API_URL = 'http://localhost:3000';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      message.error('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    // TODO: Implementar lógica del carrito
    message.success(`${product.name_product} agregado al carrito`);
  };

  if (loading) {
    return (
      <div className="products-loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="products-page">
      <Title level={2}>Productos</Title>
      <Row gutter={[24, 24]}>
        {products.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              hoverable
              cover={
                <div className="product-image-placeholder">
                  <ShoppingCartOutlined style={{ fontSize: 64, color: '#d9d9d9' }} />
                </div>
              }
              actions={[
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  onClick={() => addToCart(product)}
                  block
                >
                  Agregar al Carrito
                </Button>,
              ]}
            >
              <Card.Meta
                title={product.name_product}
                description={`$${product.price}`}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Products;

