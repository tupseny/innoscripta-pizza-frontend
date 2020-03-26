import React, {useState} from 'react';
import './App.scss';
import {Menu} from "./components/menu";
import {NavbarPizza} from "./components/navigation";
import {Container} from "react-bootstrap";
import {AlertContext} from "./redux/context";
import {PizzaAlert} from "./components/other/alert";

function App() {
    const alertContext = useState({success: '', error: ''});

    return (
        <AlertContext.Provider value={alertContext}>
            <Container>
                <NavbarPizza/>
                <Menu/>
                <PizzaAlert timeout={3000}/>
            </Container>
        </AlertContext.Provider>
    );
}

export default App;
