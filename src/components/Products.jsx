import { useProducts } from "../context/ProductContext/ProductContext";
import { Card, Col, Row, Spin, Button, Typography } from "antd";
import './Products.scss';
import { useCart } from "../context/ProductContext/CartContext";

const { Title } = Typography;

export default function Products() {
  const { products, loading, error } = useProducts();
  const {addToCart} = useCart();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
        {error}
      </div>
    );
  }

  return (
    <div className="products-container">
      <Title level={2}>Productos</Title>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              hoverable
              cover={
                <img
                  alt={product.name_product}
                  src={product.image_url || 'https://via.placeholder.com/400x300'}
                  className="product-image"
                />
              }
              actions={[
                <Button onClick={()=>addToCart(product)} type="primary" block>
                  Añadir al carrito
                </Button>
              ]}
            >
              <Card.Meta
                title={product.name_product}
                description={`$${product.price?.toLocaleString()}`}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
