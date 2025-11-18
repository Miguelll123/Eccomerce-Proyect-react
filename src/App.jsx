import { ConfigProvider, Card } from 'antd';
import esES from 'antd/locale/es_ES';
import Layout from './components/layout/Layout';
import './App.css';
import { ProductProvider } from './context/ProductContext/ProductContext';
import Products from './components/Products';

function App() {
  return (
    <ConfigProvider locale={esES}>
      <ProductProvider>
      <Layout>
        <Products/>
      </Layout>
     </ProductProvider>
    </ConfigProvider>
  );
}

export default App;
