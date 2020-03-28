import React from "react";

export const CURRENCY = {
  dollar: '$',
  euro: '€',
};

export const Dollar = (props) => {
    return <Currency children={props.children} prefix={CURRENCY.dollar}/>
};

export const Euro = (props) => {
    return <Currency children={props.children} suffix={CURRENCY.euro}/>
};

const Currency = (props) => {
    const {children, prefix, suffix} = props;

    if (isNaN(children)){return <div>NaN</div>}

    let val = children;

    val = Math.round(val);
    val = prefix ? prefix + val : val;
    val += suffix ? suffix : '';

    return <span>{val}</span>;
};
