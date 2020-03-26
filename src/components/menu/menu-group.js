import React, {useContext, useEffect, useState} from "react";
import {API_URL} from "../../helpers/config";
import {Button, Card, Col, ListGroup, ProgressBar, Row} from "react-bootstrap";
import {Meal} from "./menu-meal";
import {PlusSquare, PlusSquareFill} from "bootstrap-icons-react";
import {actions} from "../../redux/reduxer/menu-reducer";
import {MenuContext} from "../../redux/context";
import {MenuService} from '../../services/menu-service'

export const Group = (props) => {
    const {id, name} = props;
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const successCallback = (data) => {
            setItems(data);
            setIsLoaded(true);
        };

        const errorCallback = (err) => {
            setIsLoaded(true);
            console.log(err);
        };

        MenuService.fetchMeal(id, successCallback, errorCallback);
    }, [id]);

    const renderLoading = () => <ProgressBar className={''} variant={"warning"} animated now={100}/>;
    const renderHeader = (title) => <Card.Header className={'text-uppercase'}>{title}</Card.Header>;
    const renderBody = () => isLoaded ?
        <ListGroup>
            {items ? items.map(item => <GroupRow key={item.id} id={item.id} name={item.name} price={item.price}/>) : null}
        </ListGroup> : renderLoading();

    return <Card>
        {renderHeader(name)}
        {renderBody()}
    </Card>
};

const GroupRow = (props) => {
    const {name, price, id} = props;
    const [isInCart, setIsInCart] = useState(false);
    const [amount, setAmount] = useState(0);

    const dispatch = useContext(MenuContext)[1];

    function updateContext(newAmount) {
        dispatch({
            type: actions.updateAmount,
            item: {id: id, name: name, price: price, amount: newAmount}
        });
    }

    const onAddClick = (e) => {
        e.preventDefault();
        const newState = !isInCart;
        setIsInCart(newState);

        const newAmount = newState ? 1 : 0;
        updateContext(newAmount);
        setAmount(newAmount);
    };

    const onAmountChanged = (e) => {
        e.preventDefault();
        const val = e.target.value;
        const newAmount = val ? val : 0;

        updateContext(newAmount);

        if (newAmount > 0){
            setIsInCart(true);
        }
        setAmount(newAmount);
    };

    const renderMeal = () => <Meal name={name} price={price}/>;

    return <ListGroup.Item>
        <Row className={''}>
            <Col md={9} className={'d-flex-inline'}>{renderMeal()}</Col>
            <Col className={'d-flex justify-content-end'}>
                <Counter className={''} onChange={onAmountChanged} value={amount}/>
                <div className={'ml-1'}><AddButton isInCart={isInCart} onClick={onAddClick}/></div>
            </Col>
        </Row>
    </ListGroup.Item>;
};

const Counter = (props) => {
    const {onChange, value} = props;

    return <input min={0} size={2} id={'counter'} type={'number'} onChange={onChange} value={value}/>
};

const AddButton = (props) => {
    const {onClick} = props;
    let {isInCart} = props;
    isInCart = isInCart ?? false;

    const renderButtonBody = () => isInCart ? <PlusSquare/> : <PlusSquareFill/>;
    const renderButtonWithListener = () => <Button id={'add-icon-but'} onClick={onClick}>{renderButtonBody()}</Button>;

    return renderButtonWithListener();
};
