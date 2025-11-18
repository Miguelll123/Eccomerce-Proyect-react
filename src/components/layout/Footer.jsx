import { Layout } from 'antd';
import './Footer.scss';

const { Footer: AntFooter } = Layout;

function Footer() {
  return (
    <AntFooter className="app-footer">
      <p>© 2025 Ecommerce. Todos los derechos reservados.</p>
    </AntFooter>
  );
}

export default Footer;


