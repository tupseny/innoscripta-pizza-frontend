import React, {useContext, useState} from "react";
import {Lock} from "bootstrap-icons-react";

import './login.scss';
import {Button, Form, FormGroup} from "react-bootstrap";
import {useForm} from "../../hooks/useForm";
import {RegisterValidator} from "../../validators";
import LoginValidator from "../../validators/login-validator";
import {AuthService} from "../../services/auth-service";
import {AlertContext, UserContext} from "../../redux/context";

const LOGIN = 'Log in';

export const LoginPage = () => {
    const setAlert = useContext(AlertContext)[1];
    const setUser = useContext(UserContext)[1];

    const login = (values) => {
        const data = {
            email: values.email,
            password: values.password,
        };

        const successCallback = (data) => {
            console.log(data);
            if (data.api_token) {
                AuthService.saveToken(data.api_token);
                setUser(data);
                setAlert({'success': 'Successfully logged in'});
            } else {
                setAlert({'error': 'Bad credentials'});
            }
        };

        AuthService.authenticate(data, successCallback, (err) => console.log);
    };

    return <LoginBrowser handleLogin={login}/>;
};

const LoginBrowser = (props) => {
    const {handleLogin} = props;
    const {values, handleChange, handleSubmit} = useForm(handleLogin, LoginValidator);
    const [validated, setValidated] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity()) {
            handleSubmit(e);
        }

        setValidated(true);
    };

    return <div className="login-form-container">
        <Form noValidate validated={validated} method="post" onSubmit={onSubmit}>
            <div className="illustration"><Lock/></div>
            <FormGroup>
                <Form.Control required onChange={handleChange} value={values.email || ''} type="email" name="email"
                              placeholder="Email"/>
            </FormGroup>
            <FormGroup>
                <Form.Control required onChange={handleChange} value={values.password || ''} type="password"
                              name="password" placeholder="Password"/>
            </FormGroup>
            <FormGroup>
                <Button block type="submit">{LOGIN}</Button>
            </FormGroup>
        </Form>
    </div>
};
