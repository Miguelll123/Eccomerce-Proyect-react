import { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Register.scss';

const { Title } = Typography;
const API_URL = 'http://localhost:3000';

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post(`${API_URL}/users`, {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
        phone: values.phone ? parseInt(values.phone) : null,
      });
      message.success('Registro exitoso. Por favor inicia sesión');
      navigate('/login');
    } catch (error) {
      message.error(error.response?.data?.error || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <Card className="register-card">
        <Title level={2} className="register-title">Registro</Title>
        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="firstName"
            label="Nombre"
            rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nombre" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Apellido"
            rules={[{ required: true, message: 'Por favor ingresa tu apellido' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Apellido" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Por favor ingresa tu email' },
              { type: 'email', message: 'Email no válido' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Teléfono"
          >
            <Input prefix={<PhoneOutlined />} placeholder="Teléfono (opcional)" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Contraseña"
            rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirmar Contraseña"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Por favor confirma tu contraseña' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Las contraseñas no coinciden'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirmar Contraseña" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Registrarse
            </Button>
          </Form.Item>

          <div className="register-footer">
            <span>¿Ya tienes cuenta? </span>
            <Link to="/login">Inicia sesión aquí</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Register;

