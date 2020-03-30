import React from 'react';
import 'bootswatch/dist/journal/bootstrap.min.css'
import './App.scss';
import {Menu} from "./components/menu";
import {Cart} from "./components/cart"
import {NavbarPizza} from "./components/navigation";
import {PizzaAlert} from "./components/other/alert";
import {AppContext} from "./components/app-with-context";
import {Register, Login} from "./components/auth/";
import {InitApp} from "./components/init-app";
import {Footer} from "./components/navigation/footer/footer";
import {Redirect, Route, Switch, WithRouter} from 'react-router';

function App() {
    return (
        <AppContext>
                <InitApp/>
                <NavbarPizza/>
                <Switch>
                    <Route path={'/menu'} component={Menu}/>
                    <Route path={'/login'} component={Login}/>
                    <Route path={'/register'} component={Register}/>
                    <Route path={'/cart'} component={Cart}/>
                    <Redirect to={'/home'} from={'/'}/>
                </Switch>
                <PizzaAlert timeout={3000}/>
                <Footer/>
        </AppContext>
    );
}

export default WithRouter(App);
