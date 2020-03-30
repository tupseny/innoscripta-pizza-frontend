import {Card, Col, ProgressBar, Row, Spinner} from "react-bootstrap";
import React, {useState, useEffect, useContext} from "react";
import {Dollar} from "../other/";
import {PlusSquare, PlusSquareFill} from "bootstrap-icons-react";

import './menu.scss';
import {MenuService} from "../../services/menu-service";
import {CartContext} from "../../redux/context";
import {actions} from "../../redux/reduxer/cart-reducer";

const ITEMS_KEY = 'menu-groups';


/*
*   Render all groups. Groups are requested from server
*
* */
export const MenuBrowser = () => {
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    //Get items from cache if exist
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem(ITEMS_KEY));
        if (items) {
            setItems(items);
            setIsLoaded(true)
        }
    }, []);

    //Fetch items from server
    useEffect(() => {
        const successCallback = (data) => {
            setItems(data);
            setIsLoaded(true);
            localStorage.setItem(ITEMS_KEY, JSON.stringify(data));
        };

        const errorCallback = (err) => {
            setIsLoaded(true);
            console.log(err);
        };

        MenuService.fetchMenu(successCallback, errorCallback)
    }, []);

    //Spinner
    const renderLoading = () => <Spinner className={'m-auto mt-5'} animation={"border"} variant={"warning"}/>;

    const renderGroups = () =>
        isLoaded ? items ? items.map(item =>
            <MenuGroup key={item.id} id={item.id} title={item.name}/>
        ) : null : renderLoading();

    return renderGroups();
};


/*
*   Render whole group with title and items. Meals are requested from server
*
*  PROPS:
*   title - group name
*   id - id of group got from server
*
* */
const MenuGroup = (props) => {
    const {title, id} = props;
    const [items, setItems] = useState([]);

    useEffect(() => {
        const successCallback = (data) => {
            setItems(data);
        };

        const errorCallback = (err) => {
            console.log(err);
        };

        MenuService.fetchMeal(id, successCallback, errorCallback);
    }, [id]);

    const renderLoading = () => <ProgressBar variant={"warning"} animated now={100}/>;

    return <div>
        <MenuGroupHeader name={title}/>
        {items ? <MenuGroupBody items={items}/> : renderLoading()}
    </div>
};


/*
*   Render header of group of MEALS
*
*  PROPS:
*   name - group name
*
* */
const MenuGroupHeader = (props) => {
    const {name} = props;

    return <Row>
        <Col className={'menu-category-container text-uppercase text-center text-danger'}>
            <h1>{name}</h1>
        </Col>
    </Row>;
};


/*
*   Render body of group of MEALS
*
*  PROPS:
*   items - MEALs array
*
* */
const MenuGroupBody = (props) => {
    const {items} = props;

    return items ? <Row>
        {items.map((item) =>
            <Col xs={4} className={'menu-item-container'} key={item.id}>
                <MenuItem id={item.id} name={item.name} image={item.image} price={item.price}/>
            </Col>
        )}
    </Row> : null;
};


/*
*   Render one MEAL
*
*  PROPS:
*   name - meal name
*   image - url to image
*   price - price (w/o currency)
*   id - id of meal got from server
*
* */
const MenuItem = (props) => {
    const {name, image, price, id} = props;
    const imgWidth = '300px';

    const [amount, setAmount] = useState(0);
    const [isInCart, setIsInCart] = useState(false);

    const cartDispatch = useContext(CartContext)[1];

    const updateContext = (newAmount) => {
        cartDispatch({
            type: actions.updateAmount,
            item: {id: id, name: name, price: price, amount: newAmount}
        });
    };

    const onAddClick = (e) => {
        e.preventDefault();
        const newState = !isInCart;
        setIsInCart(newState);

        const newAmount = newState ? 1 : 0;
        setAmount(newAmount);
        updateContext(newAmount);
    };

    const onAmountChanged = (e) => {
        e.preventDefault();
        const val = e.target.value;
        const newAmount = val ? val : 0;

        if (newAmount > 0) {
            setIsInCart(true);
        } else {
            setIsInCart(false);
        }

        setAmount(newAmount);
        updateContext(newAmount);
    };

    const renderAddBtn = () =>
        <button className={'add-btn text-center text-danger icon-btn'} onClick={onAddClick}>
            {isInCart ? <PlusSquareFill/> : <PlusSquare/>}
        </button>;

    return <Card className={'menu-item d-flex flex-column align-items-center'}>
        <Card.Img loading={"lazy"} src={image} width={imgWidth}/>
        <Card.Body className={'w-100'}>

            <Row className={'d-flex align-items-end'}>
                <Col
                    className={'text-uppercase text-left px-0'}>
                    <h5>{name}</h5>
                </Col>

                <Row className={'d-flex align-items-baseline'}>
                    <Col className={'text-center text-dark price-container'}>
                        <Dollar>{price}</Dollar>
                    </Col>

                    <Col className={'text-right d-flex flex-row align-items-end'}>
                        {renderAddBtn()}
                        <input className={'meal-amount border-success text-center'} type={'number'} min={0}
                               onChange={onAmountChanged} value={amount}/>
                    </Col>
                </Row>
            </Row>
        </Card.Body>
    </Card>
};
