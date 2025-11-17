import { Typography, Empty } from 'antd';
import './Cart.scss';

const { Title } = Typography;

function Cart() {
  return (
    <div className="cart-page">
      <Title level={2}>Carrito de Compras</Title>
      <Empty description="Tu carrito está vacío" />
    </div>
  );
}

export default Cart;

