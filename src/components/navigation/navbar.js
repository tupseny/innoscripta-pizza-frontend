import React, {useContext} from "react";
import {Badge, Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import "./navbar.scss";
import {CONFIG} from "../../helpers/config"

import $ from 'jquery';
import {AuthService} from "../../services/auth-service";
import {CartContext, CurrencyContext, UserContext} from "../../redux/context";
import {NavLink} from "react-router-dom";
import {CURRENCY} from "../other/currency";
import {forEach} from "react-bootstrap/cjs/ElementChildren";
import {currencyActions} from "../../redux/reduxer/currency-reducer";

export const NavbarPizza = () => {
    const [user, setUser] = useContext(UserContext);
    const cartContext = useContext(CartContext)[0];
    const [currencyContext, currencyDispatch] = useContext(CurrencyContext);
    const token = AuthService.getToken();

    const config = {
        brand: {
            name: CONFIG.title,
            logo: CONFIG.urls.logo,
        },
        nav: {
            menu: {name: 'menu', href: CONFIG.paths.menu},
            home: {name: 'home', href: CONFIG.paths.home},
            cart: {name: 'cart', href: CONFIG.paths.cart},
            login: {name: 'Log in', href: CONFIG.paths.login},
            signup: {name: 'Sign up', href: CONFIG.paths.signup},
            signout: {name: 'Sign Out'},
            history: {name: 'History', href: CONFIG.paths.history},
            currency: {name: 'Currency', values: [CURRENCY.euro, CURRENCY.dollar, CURRENCY.rubble]}
        },
    };

    const handleSignOut = () => {
        setUser({});
        AuthService.logout();
    };

    const handleCurrencyChange = (key, event) => {
        if (event) event.persist();
        const choose = event.target.name;
        Object.keys(CURRENCY).forEach(value => {
            if (CURRENCY[value].symbol === choose) currencyDispatch({
                type: currencyActions.update, item: CURRENCY[value]
            });
        })
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
            return <Nav className={'mr-auto text-uppercase'}>
                <NavLink className={'nav-link'} to={config.nav.home.href}>{config.nav.home.name}</NavLink>
                <NavLink className={'nav-link'} to={config.nav.menu.href}> {config.nav.menu.name}</NavLink>
            </Nav>;
        };

        const renderRightNav = () => {
            const cartCount = cartContext.cart.length;
            return <Nav>
                <NavDropdown onSelect={handleCurrencyChange} title={currencyContext.currency.symbol}
                             id={'currency-dropdown'}>
                    {config.nav.currency.values.map((val, index) =>
                        <NavDropdown.Item key={index}
                                          name={val.symbol}>{val.symbol + ' - ' + val.name}</NavDropdown.Item>
                    )}
                </NavDropdown>
                <NavLink className={'nav-link text-uppercase'}
                         to={config.nav.cart.href}>
                    {config.nav.cart.name}
                    {cartCount > 0 ? <Badge variant={"danger"} pill>{cartContext.cart.length}</Badge> : null}
                </NavLink>
                {user.api_token || token
                    ? <>
                        <NavLink to={config.nav.history.href}
                                 className={'nav-link text-uppercase mr-3'}>{config.nav.history.name}</NavLink>
                        <Button className={'signout'}
                                onClick={handleSignOut}>{config.nav.signout.name}</Button>
                    </>

                    : <>
                        <NavLink to={config.nav.login.href}
                                 className={'login nav-link'}>{config.nav.login.name}</NavLink>
                        <NavLink to={config.nav.signup.href}
                                 className={'signup nav-link'}>{config.nav.signup.name}</NavLink>
                    </>
                }
            </Nav>;
        };


        return <Navbar expand={"md"} className={'navbar-main'}>
            {renderBrand()}
            <Navbar.Toggle ariac-controls={'navbar-nav'}/>
            <Navbar.Collapse id={'navbar-nav'}>
                {renderLeftNav()}
                {renderRightNav()}
            </Navbar.Collapse>
        </Navbar>;
    };

    return renderCollapsibleNavbar();
};

$(document).ready(function () {
    const homePath = CONFIG.paths.home;

    $(window).scroll(function () {
        const path = window.location.pathname;
        const scroll = $(window).scrollTop();
        const width = $(window).width();
        if (path === homePath && width >= 768) {
            if (scroll < 420) {
                $('.navbar-tiny').removeClass('navbar-tiny');
                $('.navbar-main').addClass('navbar-transporent');
            } else {
                $('.navbar-main').removeClass('navbar-transporent');
                $('.navbar-main').addClass('navbar-tiny');
            }
        } else {
            $('.navbar-main').removeClass('navbar-transporent');
            $('.navbar-main').addClass('navbar-tiny');
        }

    });
})
;
