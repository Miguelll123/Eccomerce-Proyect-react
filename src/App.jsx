import { ConfigProvider } from 'antd';
import esES from 'antd/locale/es_ES';
import Layout from './components/layout/Layout';
import './App.css';

function App() {
  return (
    <ConfigProvider locale={esES}>
      <Layout>
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <h1>Contenido aquí</h1>
          <p>El layout está listo. Aquí irá el contenido de las páginas.</p>
        </div>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
