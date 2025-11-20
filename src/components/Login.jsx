import React, { useContext } from 'react';
import { Button, Checkbox, Form, Input, Modal, Card } from 'antd';
import { UserContext} from '../context/AuthContext/UserState';

const Login = ({ open, onClose }) => {
    const {login} = useContext(UserContext);
    const [form] = Form.useForm();

    // Detectar si se usa como modal (tiene props open/onClose) o como página completa
    const isModal = open !== undefined;

    const onFinish = async (values) => {
        try {
            await login(values);
            // Si el login es exitoso
            form.resetFields();
            // Si es modal, cerrarlo. Si es página completa, no hacer nada (App.jsx manejará el cambio)
            if (isModal && onClose) {
                onClose();
            }
        } catch (error) {
            console.error('Error en login:', error);
        }
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const handleCancel = () => {
        form.resetFields();
        if (onClose) {
            onClose();
        }
    };

    // Contenido del formulario (compartido para modal y página)
    const formContent = (
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Por favor ingresa tu email' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Contraseña"
                name="password"
                rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 18 }}>
                <Checkbox>Recordarme</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                <Button type="primary" htmlType="submit" block>
                    Iniciar sesión
                </Button>
            </Form.Item>
        </Form>
    );

    // Si es modal → mostrar como Modal
    if (isModal) {
        return (
            <Modal
                title="Iniciar Sesión"
                open={open}
                onCancel={handleCancel}
                footer={null}
                width={500}
            >
                {formContent}
            </Modal>
        );
    }

    // Si NO es modal → mostrar como página completa
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh',
            backgroundColor: '#f0f2f5'
        }}>
            <Card 
                title="Iniciar Sesión" 
                style={{ width: 500 }}
            >
                {formContent}
            </Card>
        </div>
    );
};

export default Login;
