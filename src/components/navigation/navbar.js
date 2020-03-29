import React, {useContext} from "react";
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import "./navbar.scss";
import {CONFIG} from "../../helpers/config"

import $ from 'jquery';
import {AuthService} from "../../services/auth-service";
import {UserContext} from "../../redux/context";

export const NavbarPizza = () => {
    const [user, setUser] = useContext(UserContext);

    const menu_categories = [
        {name: 'Pizza', href: '#pizza-category'},
        {name: 'Drinks', href: '#drinks-category'},
        {name: 'Snacks', href: '#snacks-category'},
    ];

    const config = {
        brand: {
            name: CONFIG.title,
            logo: CONFIG.urls.logo,
        },
        menu: 'menu',
        nav: {
            home: {name: 'home', href: CONFIG.paths.home},
            login: {name: 'Log in', href: CONFIG.paths.login},
            signup: {name: 'Sign up', href: CONFIG.paths.sigup},
            signout: {name: 'Sign Out'}
        },
    };

    const handleSignout = () => {
        setUser({});
        AuthService.logout();
    };

    const renderCollapsibleNavbar = () => {
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
                                <div key={index}>
                                    <NavDropdown.Item href={item.href} className={'text-danger'}>
                                        {item.name}
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                </div>
                        } else {
                            html =
                                <NavDropdown.Item key={index} href={item.href}>
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
                {user.api_token
                    ? <Button className={'signout'}
                              onClick={handleSignout}>{config.nav.signout.name}</Button>
                    : <><Nav.Link href={config.nav.login.href} className={'login'}>{config.nav.login.name}</Nav.Link>
                        <Nav.Link href={config.nav.signup.href} className={'signup'}>{config.nav.signup.name}</Nav.Link>
                    </>
                }
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

$(document).ready(function () {
    const homePath = CONFIG.paths.home;

    const path = window.location.pathname;

    $(window).scroll(function () {
        const scroll = $(window).scrollTop();
        if (scroll < 400 && path === homePath) {
            $('.navbar-tiny').removeClass('navbar-tiny');
        } else {
            $('.navbar-main').addClass('navbar-tiny');
        }
    });

    switch (path) {
        case homePath:
            $('.navbar-main').addClass('navbar-transporent');
            break;
        default:
            $('.navbar-main').addClass('navbar-tiny');
    }
});
