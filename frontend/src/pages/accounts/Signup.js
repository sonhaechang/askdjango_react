import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'antd';
import Axios from 'axios';


function Signup() {
    const [inputs, setInputs] = useState({username: '', password: ''});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [formDisabled, setFormDisabled] = useState(true);

    const navigate = useNavigate();

    const onChange = (e) => {
        const { name, value } = e.target;

        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        setErrors({});
        
        const APIUrl = 'http://127.0.0.1:8000/accounts/signup/';

        Axios.post(APIUrl, inputs)
            .then(response => {
                navigate('/accounts/login');
            })
            .catch(error => {
                console.log('error: ', error);
                if (error.response) {
                    setErrors({
                        username: (error.response.data.username || []).join(' '),
                        password: (error.response.data.password || []).join(' ')
                    })
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        const isEnabled = Object.values(inputs).every(s => s.length > 0);
        setFormDisabled(!isEnabled);
    }, [inputs]);

    return (
        <form onSubmit={onSubmit}>
            <div>
                <input 
                    type="text" 
                    name="username" 
                    onChange={onChange}
                    required
                />
                {
                    errors.username && 
                    <Alert type="error" message={errors.username} />
                }
            </div>
            
            <div>
                <input 
                    type="password" 
                    name="password" 
                    onChange={onChange}
                    required
                />
                {
                    errors.password && 
                    <Alert type="error" message={errors.password} />
                }
            </div>
            
            <input 
                type="submit" 
                value="회원가입" 
                disabled={loading ||formDisabled}
            />
        </form>
    );
};

export default Signup;