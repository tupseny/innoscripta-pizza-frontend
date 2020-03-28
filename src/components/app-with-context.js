import {AlertContext, CartContext} from "../redux/context";
import React, {useReducer, useState} from "react";
import {initializer, cartReducer} from "../redux/reduxer/cart-reducer";

export const AppContext = (props) => {
    const alertContext = useState({success: '', error: ''});
    const cartContext = useReducer(cartReducer, undefined, initializer);

    return <CartContext.Provider value={cartContext}>
        <AlertContext.Provider value={alertContext}>
            {props.children}
        </AlertContext.Provider>
    </CartContext.Provider>;
};


