import React from "react";
import {Rubble} from "../other";

export const Meal = (props) => {
    const {name, price} = props;

    return <div className={'d-flex px-3'}>
        <span className={'mr-auto'}>{name}</span>
        <Rubble>{price}</Rubble>
    </div>
};