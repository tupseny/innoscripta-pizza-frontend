import React from "react";

export const Rubble = (props) => {
    const symbol = "₽";
    return <Currency value={props.children} symbol={symbol}/>
};

const Currency = (props) => {
    if (isNaN(props.value)){return <div>not number</div>}

    const prefix = props.symbol ?? '';
    let val = props.value ?? 0;

    val = Math.round(val);
    val += prefix;

    return <span className={'text-bold'}>{val}</span>;
};