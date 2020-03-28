import React from 'react';
import 'bootswatch/dist/journal/bootstrap.min.css'
import './App.scss';
import {Menu} from "./components/menu";
import {NavbarPizza} from "./components/navigation";
import {PizzaAlert} from "./components/other/alert";
import {AppContext} from "./components/app-with-context";

function App() {
    return (
        <AppContext>
                <NavbarPizza/>
                <Menu/>
                <PizzaAlert timeout={3000}/>
        </AppContext>
    );
}

export default App;
