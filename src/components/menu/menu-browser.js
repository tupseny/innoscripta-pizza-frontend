import {Card, Col, ProgressBar, Row, Spinner} from "react-bootstrap";
import React, {useState, useEffect, useContext} from "react";
import {Dollar} from "../other/";
import {PlusSquare, PlusSquareFill} from "bootstrap-icons-react";

import './menu.scss';
import {MenuService} from "../../services/menu-service";
import {CartContext, CurrencyContext} from "../../redux/context";
import {actions} from "../../redux/reduxer/cart-reducer";
import {PizzaPromise} from "../../helpers/promise";
import {Currency} from "../other/currency";

const GROUPS_KEY = 'menu-groups';
const MEALS_KEY = 'group-items';


/*
*   Render all groups. Groups are requested from server
*
* */
export const MenuBrowser = () => {
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    //Get items from cache if exist
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem(GROUPS_KEY));
        if (items && Object.keys(items).length > 0) {
            setItems(items);
            setIsLoaded(true)
        }
    }, []);

    //Fetch items from server
    useEffect(() => {
        let isSubscribed = true;
        const callback = (data) => {
            if (!isSubscribed) return;

            setItems(data);
            setIsLoaded(true);
            localStorage.setItem(GROUPS_KEY, JSON.stringify(data));
        };

        MenuService.fetchMenu(new PizzaPromise(callback));

        return () => {isSubscribed = false};
    }, []);

    //Spinner
    const renderLoading = () => <Spinner className={'m-auto mt-5'} animation={"border"} variant={"warning"}/>;

    const renderGroups = () => {
        return isLoaded ? (items ? items.map(item =>
            <MenuGroup key={item.id} id={item.id} title={item.name}/>
        ) : null) : renderLoading();
    };

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
    const [isLoading, setIsloading] = useState(true);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem(MEALS_KEY + '_' + id));

        if (items && Object.keys(items).length > 0) {
            setItems(items);
            setIsloading(false)
        }
    }, [id]);

    useEffect(() => {
        let isSubscribed = true;

        const callback = (data) => {
            if (!isSubscribed) return;

            setIsloading(false);
            setItems(data);
            localStorage.setItem(MEALS_KEY + '_' + id, JSON.stringify(data))
        };

        MenuService.fetchMeal(id, new PizzaPromise(callback));

        return () => {isSubscribed = false}
    }, [id]);

    const renderLoading = () => <ProgressBar variant={"warning"} animated now={100}/>;

    return <div className={'d-flex flex-column'}>
        <Col>
            <MenuGroupHeader name={title}/>
        </Col>
        <Col>
            {isLoading ? renderLoading() : (items ? <MenuGroupBody category={title} items={items}/> : null)}
        </Col>
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
    const {items, category} = props;

    return items ? <Row>
        {items.map((item) =>
            <Col className={'menu-item-container'} key={item.id}>
                <MenuItem image={category.toLowerCase() + '_' + item.name.toLowerCase() + '.png'} category={category} id={item.id} name={item.name} price={item.price}/>
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
    const {name, image, price, id, category} = props;
    const imgWidth = '300px';

    const [amount, setAmount] = useState(0);
    const [isInCart, setIsInCart] = useState(false);

    const [cartContext, cartDispatch] = useContext(CartContext);

    useEffect(() => {
        const cart = cartContext.cart;

        if (cart) {
            const item = cart.find(el => el.id === id);
            if (item) {
                const newAmount = item.amount;
                setAmount(newAmount);
                if (newAmount > 0) setIsInCart(true);
            }
        }
    }, []);

    const updateContext = (newAmount) => {
        cartDispatch({
            type: actions.updateAmount,
            item: {id: id, name: name, price: price, amount: newAmount, category: category}
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
        <Card.Img loading={"lazy"} src={'static/img/' + image} width={imgWidth}/>
        <Card.Body className={'w-100'}>

            <Row className={'d-flex align-items-end'}>
                <Col
                    className={'text-uppercase text-left px-0'}>
                    <h5>{name}</h5>
                </Col>

                <Row className={'d-flex align-items-baseline'}>
                    <Col className={'text-center text-dark price-container'}>
                        <Currency>{price}</Currency>
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
