import {AlertContext, CartContext, CurrencyContext, UserContext} from "../redux/context";
import React, {useReducer, useState} from "react";
import {cartInitializer, cartReducer} from "../redux/reduxer/cart-reducer";
import {CURRENCY} from "./other/currency";
import {currencyInitializer, currencyReducer} from "../redux/reduxer/currency-reducer";

export const AppContext = (props) => {
    const alertContext = useState({success: '', error: ''});
    const cartContext = useReducer(cartReducer, undefined, cartInitializer);
    const userContext = useState({});
    const currencyContext = useReducer(currencyReducer, undefined, currencyInitializer);

    return <CartContext.Provider value={cartContext}>
        <AlertContext.Provider value={alertContext}>
            <UserContext.Provider value={userContext}>
                <CurrencyContext.Provider value={currencyContext}>
                    {props.children}
                </CurrencyContext.Provider>
            </UserContext.Provider>
        </AlertContext.Provider>
    </CartContext.Provider>;
};


