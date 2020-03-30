import {PersonPlus} from "bootstrap-icons-react";
import React, {useContext, useState} from "react";

import './register.scss';
import {Button, Form, FormControl, FormGroup, Spinner} from "react-bootstrap";
import {useForm} from "../../hooks/useForm";
import {RegisterValidator} from "../../validators";
import {AuthService} from "../../services/auth-service";
import {CONFIG} from "../../helpers/config";
import {AlertContext} from "../../redux/context";

const CREATE_ACCOUNT_TITLE = 'Create an account';
const SUBMIT_BUT = 'Sign Up';
const LOGIN = 'You already have an account? Login here.';

export const RegisterPage = () => {
    const setAlert = useContext(AlertContext)[1];
    const [loading, setLoading] = useState(false);

    const register = (values) => {
        setLoading(true);

        const successCallback = data => {
            setLoading(false);
            console.log(data);

            if (data.errors)
                Object.keys(data.errors).forEach((key) => {
                    setAlert({error: data.errors[key][0]});
                });

            if (data.api_token) {
                AuthService.saveToken(data.api_token);
                setAlert({success: 'Successfully registered!'});
            }
        };

        const errorCallback = err => {
            console.log(err);
        };

        const data = {
            'email': values.email,
            'password': values.password,
        };

        AuthService.register(data, successCallback, errorCallback);
    };

    return <RegisterFormBrowser loginUrl={CONFIG.paths.login} handleRegister={register} loading={loading}/>
};

const RegisterFormBrowser = (props) => {
    const {loginUrl, handleRegister, loading} = props;

    const [validated, setValidated] = useState(false);
    const {errors, values, handleChange, handleSubmit} = useForm(handleRegister, RegisterValidator);

    const onSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity()) {
            handleSubmit(e);
        }

        setValidated(true);
    };

    return <div className="register">
        <div className="form-container">
            <div className="illustration"><PersonPlus/></div>

            <Form noValidate validated={validated} method="post" onSubmit={onSubmit}>
                <input autoComplete="false" name="hidden" type="text" style={{'display': 'none'}}/>
                <h2 className="text-center">{CREATE_ACCOUNT_TITLE}</h2>
                <FormGroup controlId={'email'}>
                    <Form.Control onChange={handleChange} required type="email" name="email" placeholder="Email"/>
                </FormGroup>
                <FormGroup controlId={'password'}>
                    <Form.Control onChange={handleChange} required type="password" name="password"
                                  placeholder="Password"/>
                </FormGroup>
                <FormGroup controlId={'password-repeat'}>
                    <Form.Control onChange={handleChange} required type="password" name="rePassword"
                                  placeholder="Password (repeat)" value={values.rePassword || ''}
                                  className={errors.rePassword ? 'is-invalid' : 'is-valid'}/>
                    <FormControl.Feedback type={'invalid'} style={{'display': errors.rePassword ? 'block' : 'none'}}>Passwords
                        don't match</FormControl.Feedback>
                </FormGroup>
                <FormGroup>
                    <Button block type="submit" disabled={loading}>{loading ?
                        <Spinner animation={"grow"} variant={"warning"}/> : SUBMIT_BUT}</Button>
                </FormGroup>
                <a className="already" href={loginUrl}>{LOGIN}</a>
            </Form>
        </div>
    </div>
};
