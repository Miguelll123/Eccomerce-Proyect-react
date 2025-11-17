import { useState, useEffect } from 'react';
import { Card, Typography, Spin, Descriptions, Table, message } from 'antd';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Profile.scss';

const { Title } = Typography;
const API_URL = 'http://localhost:3000';

function Profile() {
  const { user, token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      getProfile();
      getOrders();
    }
  }, [token]);

  const getProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);
    } catch (error) {
      message.error('Error al cargar el perfil');
    }
  };

  const getOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      message.error('Error al cargar los pedidos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Title level={2}>Mi Perfil</Title>
      <Card className="profile-card">
        <Descriptions title="Datos del Usuario" bordered>
          <Descriptions.Item label="Nombre">
            {profile?.first_name} {profile?.last_name}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{profile?.email}</Descriptions.Item>
          <Descriptions.Item label="Teléfono">{profile?.phone || 'No registrado'}</Descriptions.Item>
          <Descriptions.Item label="Rol">{profile?.role || 'Usuario'}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card className="orders-card" style={{ marginTop: 24 }}>
        <Title level={3}>Mis Pedidos</Title>
        {orders.length === 0 ? (
          <p>No tienes pedidos aún</p>
        ) : (
          <Table
            dataSource={orders}
            rowKey="id"
            columns={[
              { title: 'ID', dataIndex: 'id', key: 'id' },
              { title: 'Fecha', dataIndex: 'date', key: 'date' },
            ]}
          />
        )}
      </Card>
    </div>
  );
}

export default Profile;

