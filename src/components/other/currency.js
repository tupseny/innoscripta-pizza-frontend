import React, {useContext} from "react";
import {CurrencyContext} from "../../redux/context";

export const CURRENCY = {
    dollar: {symbol: '$', name: 'Dollar', prefix: true},
    euro: {symbol: '€', name: 'Euro', suffix: true},
    rubble: {symbol: "₽", name: "Rubble", suffix: true},
};

const EXCHANGE_RATES = {
    dollar: {
        euro: {symbol: CURRENCY.euro.symbol, rate: 0.9071},
        dollar: {symbol: CURRENCY.dollar.symbol, rate: 1},
        rubble: {symbol: CURRENCY.rubble.symbol, rate: 78.4579}
    }
};

export const Currency = (props) => {
    const curCurrency = useContext(CurrencyContext)[0];
    const {children} = props;

    const currency = curCurrency.currency;

    if (isNaN(children)) {
        return <div>NaN</div>
    }

    let val = children;

    val *= getDollarExchangeRate(currency);
    val = Math.round(val);

    val = currency.prefix ? currency.symbol + val : val;
    val += currency.suffix ? currency.symbol : '';

    return <span>{val}</span>;
};

function getDollarExchangeRate(newCurrency) {
    return  getCurrencyRate(newCurrency.symbol);

    function getCurrencyRate(symbol) {
        return Object.keys(EXCHANGE_RATES.dollar).reduce((result, key) => {
            const item = EXCHANGE_RATES.dollar[key];
            if (item.symbol === symbol) {
                return item.rate;
            }else{
                return result > 0 ? result : item.rate;
            }
        }, 0);
    }
}
