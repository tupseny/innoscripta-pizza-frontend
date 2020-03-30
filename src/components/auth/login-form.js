import React, {useContext, useState} from "react";
import {Lock} from "bootstrap-icons-react";

import './login.scss';
import {Button, Form, FormGroup, Spinner} from "react-bootstrap";
import {useForm} from "../../hooks/useForm";
import LoginValidator from "../../validators/login-validator";
import {AuthService} from "../../services/auth-service";
import {AlertContext, UserContext} from "../../redux/context";

const LOGIN = 'Log in';

export const LoginPage = () => {
    const setAlert = useContext(AlertContext)[1];
    const setUser = useContext(UserContext)[1];
    const [loading, setLoading] = useState(false);

    const login = (values) => {
        const data = {
            email: values.email,
            password: values.password,
        };

        setLoading(true);

        const successCallback = (data) => {
            const user = data.user;
            setLoading(false);
            console.log(user);
            if (user?.api_token) {
                AuthService.saveToken(user.api_token);
                setUser(user);
                setAlert({'success': 'Successfully logged in'});
            } else {
                setAlert({'error': 'Bad credentials'});
            }
        };

        AuthService.authenticate(data, successCallback, (err) => console.error(err));
    };

    return <LoginBrowser handleLogin={login} loading={loading}/>;
};

const LoginBrowser = (props) => {
    const {handleLogin, loading} = props;
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
                <Button block disabled={loading} type="submit">{loading ?
                    <Spinner animation={"grow"} variant={'warning'}/> : LOGIN}</Button>
            </FormGroup>
        </Form>
    </div>
};
