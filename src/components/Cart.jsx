import { useContext } from "react";
import { useCart } from "../context/ProductContext/CartContext";
import { Card, Col, Row, Spin, Button, Typography } from "antd";

const { Title } = Typography;

const cart = ()=> {
    const {cart} = useCart();
    if(cart.length ===0){
        return <div>Todavía no tienes ningun producto </div>
    }

  const cartItem = cart.map((cartItem, index) => {
    return (
      <Col xs={24} sm={12} md={8} lg={6} key={index}>
        <Card
          hoverable
          cover={
            <img
              alt={cartItem.name_product}
              src={cartItem.image_url || "https://via.placeholder.com/300"}
              className="product-image"
            />
          }
        >
          <Card.Meta
            title={cartItem.name_product}
            description={`$${cartItem.price?.toLocaleString()}`}
          />
          <div style={{ marginTop: 10 }}>
            <p>Cantidad: {cartItem.quantity || 1}</p>
            <p>
              Total: $
              {(
                (cartItem.quantity || 1) * cartItem.price
              ).toLocaleString()}
            </p>
          </div>
        </Card>
      </Col>
    );
  });

  // 2º return → del componente
  return (
    <div className="products-container">
      <Title level={2}>Carrito</Title>
      <Row gutter={[16, 16]}>{cartItem}</Row>
    </div>
  );
};

export default cart;