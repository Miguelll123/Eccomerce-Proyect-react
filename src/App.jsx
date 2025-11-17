import { ConfigProvider, Card } from 'antd';
import esES from 'antd/locale/es_ES';
import Layout from './components/layout/Layout';
import './App.css';

function App() {
  return (
    <ConfigProvider locale={esES}>
      <Layout>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <Card 
            style={{ 
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px'
            }}
          >
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <h1 style={{ color: '#262626', marginBottom: '16px', fontSize: '28px' }}>
                Contenido aquí
              </h1>
              <p style={{ color: '#8c8c8c', fontSize: '16px', margin: 0 }}>
                El layout está listo. Aquí irá el contenido de las páginas.
              </p>
            </div>
          </Card>
        </div>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
