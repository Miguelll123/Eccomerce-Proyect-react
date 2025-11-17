import { Layout as AntLayout } from 'antd';
import Header from './Header';
import Footer from './Footer';
import '../layout/Layout.scss';

const { Content } = AntLayout;

function Layout({ children }) {
  return (
    <AntLayout className="app-layout">
      <Header />
      <Content className="layout-content">
        {children}
      </Content>
      <Footer />
    </AntLayout>
  );
}

export default Layout;

