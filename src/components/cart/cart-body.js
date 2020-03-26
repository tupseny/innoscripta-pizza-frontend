import {Col, ListGroup, Row} from "react-bootstrap";
import {Meal} from "../menu/menu-meal";
import {Rubble} from "../other";
import React from "react";

export const CartItems = (props) => {
    const {items} = props;

    const renderItems = () => items.map(item =>
        <ListGroup.Item key={item.id}>
            <Row>
                <Col>
                    <Meal name={item.name} price={item.price}/>
                </Col>
                <Col className={'border-left'} md={2}>
                    <span>x{item.amount}</span>
                </Col>
            </Row>
        </ListGroup.Item>);

    return <ListGroup>
        {renderItems()}
    </ListGroup>
};

export const PriceSum = (props) => {
    const {items} = props;

    const calcNewValue = () => {
        return items.reduce((acc, item) => {
            const price = parseInt(item.price) * parseInt(item.amount);
            return acc + price;
        }, 0);
    };

    const renderAmount = () =>
        <div className={'d-flex'}>
            <span className={'mr-2'}>Sum: </span>
            <Rubble>{calcNewValue()}</Rubble>
        </div>;

    return renderAmount();
};
