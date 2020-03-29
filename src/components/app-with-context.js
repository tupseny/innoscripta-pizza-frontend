import {AlertContext, CartContext, UserContext} from "../redux/context";
import React, {useReducer, useState} from "react";
import {initializer, cartReducer} from "../redux/reduxer/cart-reducer";

export const AppContext = (props) => {
    const alertContext = useState({success: '', error: ''});
    const cartContext = useReducer(cartReducer, undefined, initializer);
    const userContext = useState({});

    return <CartContext.Provider value={cartContext}>
        <AlertContext.Provider value={alertContext}>
            <UserContext.Provider value={userContext}>
                {props.children}
            </UserContext.Provider>
        </AlertContext.Provider>
    </CartContext.Provider>;
};


