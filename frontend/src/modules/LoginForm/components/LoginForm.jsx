import React,{useState} from "react";
import { Redirect } from "react-router"

import {Block, Button} from "components";
import { Form, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
    axios.defaults.withCredentials = true;
    const [formData,setFormData] = useState({email:"",password:""});
    const [auth,setAuth] = useState(false);
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const sendData = () =>{
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            axios({
                method: 'post',
                url: 'http://localhost:8000/login',
                data: formData,
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
              })
            .then(function (response) {
              response.status === 200 ? setAuth(true): setAuth(false)
            });
        });
       
    }
    
    if(auth){
        return(
            <Redirect push to="/admin" />
        )
    }

    return (
        <>
        <div className="auth__top">
            <h2>Войти в аккаунт</h2>
            <p>Пожалуйста, войдите в свой аккаунт</p>
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
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username!',
                  },
                ]}
            >
                <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                value={formData.email}
                onChange={(e)=>{setFormData({...formData, email: e.target.value})}}
                size="large"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
            >
                <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e)=>{setFormData({...formData, password: e.target.value})}}
                size="large"
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" size="large" onClick={sendData}>
                Войти в аккаунт
                </Button>
            </Form.Item>
            <Form.Item style={{ marginBottom: "0px" }}>
                <Link className="auth__register-link" to="/register">
                Зарегистрироваться
                </Link>
            </Form.Item>
            </Form>
        </Block>
        </>
    );
};

export default LoginForm;
