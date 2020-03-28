import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import "./navbar.scss";

import $ from 'jquery';

export const NavbarPizza = () => {
    const menu_categories = [
        {name: 'Pizza', href: '#pizza-category'},
        {name: 'Drinks', href: '#drinks-category'},
        {name: 'Snacks', href: '#snacks-category'},
    ];

    const config = {
        brand: {
            name: 'pizza',
            logo: '',
        },
        toggle_hint: 'Toggle navigation',
        menu: 'menu',
        nav: {
            home: {name: 'home', href: '/'},
            login: {name: 'Log in', href: '/login'},
            signup: {name: 'Sign up', href: '/signup'},
        },
    };

    const renderCollapsibleNavbar = () =>{
        const renderBrand = () =>
            <Navbar.Brand href={config.nav.home.href}>
                <img
                    alt=''
                    id="logo"
                    className="d-inline-block align-top"
                    src={config.brand.logo}
                    width="30"
                    height="30"
                />{' '}
                {config.brand.name}
            </Navbar.Brand>;

        const renderLeftNav = () => {
            const renderNavDropdown = () =>
                <NavDropdown title={config.menu}>
                    {menu_categories.map((item, index) => {
                        let html;
                        if (index === 0) {
                            html =
                                <div>
                                    <NavDropdown.Item href={item.href} className={'text-danger'}>
                                        {item.name}
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                </div>
                        } else {
                            html =
                                <NavDropdown.Item href={item.href}>
                                    {item.name}
                                </NavDropdown.Item>
                        }

                        return html;
                    })}
                </NavDropdown>;

            return <Nav className={'mr-auto text-uppercase'}>
                <Nav.Link href={config.nav.home.href}>{config.nav.home.name}</Nav.Link>
                {renderNavDropdown()}
            </Nav>;
        };

        const renderRightNav = () =>
            <Nav>
                <Nav.Link href={config.nav.login.href} className={'login'}>{config.nav.login.name}</Nav.Link>
                <Nav.Link href={config.nav.signup.href} className={'signup'}>{config.nav.signup.name}</Nav.Link>
            </Nav>;

        return <Navbar expand={"md"} className={'navbar-main'}>
            {renderBrand()}
            <Container>
                <Navbar.Toggle ariac-controls={'navbar-nav'}/>
                <Navbar.Collapse id={'navbar-nav'}>
                    {renderLeftNav()}
                    {renderRightNav()}
                </Navbar.Collapse>
            </Container>
        </Navbar>;
    };

    return renderCollapsibleNavbar();
};

$(window).scroll(function(){
    const scroll = $(window).scrollTop();
    if(scroll < 400){
        $('.navbar-tiny').removeClass('navbar-tiny');
    }else{
        $('.navbar-main').addClass('navbar-tiny');
    }
});

$(document).ready(function(){
    const homePath = '/';
    const loginPath = '/login';

    const path = window.location.pathname
    switch (path){
        case homePath:
            $('.navbar-main').addClass('navbar-transporent');
            break;
        case loginPath:
            $('.navbar-main').addClass('navbar-tiny');
            break;
        default:
            break;
    }
});
