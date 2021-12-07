import React from "react";

import {Block, Button} from "components";
import { Form, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom";

const RegisterForm = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (
        <>
        <div className="auth__top">
            <h2>Регистрация</h2>
            <p>Для входа в чат, вам нужно зарегистрироваться</p>
        </div>

        <Block>
            <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            >
                <Form.Item
                name="email"
                // rules={[
                //   {
                //     required: true,
                //     message: 'Please input your Username!',
                //   },
                // ]}
            >
                <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Ваш e-mail"
                size="large"
                />
            </Form.Item>
            <Form.Item
                name="username"
                // rules={[
                //   {
                //     required: true,
                //     message: 'Please input your Username!',
                //   },
                // ]}
            >
                <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Ваше имя"
                size="large"
                />
            </Form.Item>
            <Form.Item
                name="password"
                // rules={[
                //   {
                //     required: true,
                //     message: 'Please input your Password!',
                //   },
                // ]}
            >
                <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Пароль"
                size="large"
                />
            </Form.Item>
            <Form.Item
                name="password"
                // rules={[
                //   {
                //     required: true,
                //     message: 'Please input your Password!',
                //   },
                // ]}
            >
                <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Повторите пароль"
                size="large"
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" size="large">
                Зарегистрироваться
                </Button>
            </Form.Item>
            <Form.Item style={{ marginBottom: "0px" }}>
                <Link className="auth__register-link" to="/signin">
                Войти в аккаунт
                </Link>
            </Form.Item>
            </Form>
        </Block>
        </>
    );
};

export default RegisterForm;
