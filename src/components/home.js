import React from "react";

import './home.scss'
import {Button, Col, Row} from "react-bootstrap";
import {Menu} from "./menu";
import {Link} from "react-router-dom";
import {CONFIG} from "../helpers/config";

export const Home = (props) => {
    return <>
        <Header image={'header-background.jpeg'}/>
        <Menu/>
    </>
};

const Header = (props) => {
    const {image} = props;

    return <div className={'header-container'}>
        <div className="header-blue"
             style={{
                 'backgroundImage': 'url(static/img/' + image + ')',
                 'backgroundSize': 'cover',
                 'backgroundRepeat': 'no-repeat',
                 'backgroundPosition': 'left'
             }}
        >
            <div className="container hero">
                <Row>
                    <Col className="text-center">
                        <h1 className="display-2 text-uppercase text-center pulse animated">
                            Welcome to PizzaStore</h1>
                    </Col>
                </Row>

                <Row className="justify-content-md-center bounce animated hero-btn-group">
                    <Col xs={12} lg={6} xl={5} className="text-center">
                        <a href={'#menu-section'}
                              className={"btn btn-warning btn-block text-uppercase text-center text-dark border rounded border-primary bounce animated infinite"}>
                            show me pizza
                        </a>
                    </Col>

                    <Col xs={12} lg={6} xl={5} className="text-center">
                        <Link to={CONFIG.paths.login} className="btn btn-outline-warning btn-block text-uppercase text-center">
                            log in
                        </Link>
                    </Col>
                </Row>
            </div>

        </div>
    </div>
};
