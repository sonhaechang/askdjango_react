import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import { Card, Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { useAppContext } from "store";
import { setToken } from "store";
import { parseErrorMessages } from 'utils/forms';

function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const { dispatch } = useAppContext();
    const [fieldErrors, setFieldErrors] = useState({});

    const { from: loginRedirectUrl } = location.state || {
        from: { pathname: '/' }
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
    };
      
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 }
    };

    const onFinish = values => {
        async function fn() {
            setFieldErrors({});

            const { username, password } = values;
            const data = { username, password };
            try {
                    const response = await Axios.post(
                        'http://127.0.0.1:8000/accounts/token/',
                        data
                    );
                    
                    const {
                        data: { 
                            access: accessToken,
                            // refresh: refreshToken
                        }
                    } = response;
            
                    dispatch(setToken(accessToken));
            
                    notification.open({
                        message: '로그인 성공',
                        icon: <SmileOutlined style={{ color: '#108ee9' }} />
                    });
                navigate(loginRedirectUrl);
                } catch (error) {
                    if (error.response) {
                        notification.open({
                            message: '로그인 실패',
                            description: '아이디/암호를 확인해주세요.',
                            icon: <FrownOutlined style={{ color: '#ff3333' }} />
                        });
        
                        const { data: fieldsErrorMessages } = error.response;
                        // fieldsErrorMessages => { username: "m1 m2", password: [] }
                        // python: mydict.items()

                        setFieldErrors(parseErrorMessages(fieldsErrorMessages));
                    }
                }
            }
        fn();
    };

    return (
        <Card title="로그인">
            <Form
                {...layout}
                onFinish={onFinish}
                //   onFinishFailed={onFinishFailed}
                autoComplete={"false"}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        { required: true, message: "Please input your username!" },
                        { min: 5, message: "5글자 입력해주세요." }
                    ]}
                    hasFeedback
                    {...fieldErrors.username}
                    {...fieldErrors.non_field_errors}
                >
                    <Input />
                </Form.Item>
        
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                    {...fieldErrors.password}
                >
                    <Input.Password />
                </Form.Item>
        
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Login;