import {Button, Col, Container, ListGroup, Row, Spinner, Table} from "react-bootstrap";
import React, {useContext, useEffect, useRef, useState} from "react";
import {Currency, Dollar} from "../other";
import {Trash} from "bootstrap-icons-react";
import {AlertContext, CartContext} from "../../redux/context";
import {actions} from "../../redux/reduxer/cart-reducer";
import {Order} from "./order-modal";
import {CartService} from "../../services/cart-service";
import {PizzaPromise} from "../../helpers/promise";

const FEE = 5;
export const CART_KEY = 'cart';

export const CartPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [cartContext, cartDispatch] = useContext(CartContext);
    const setAlert = useContext(AlertContext)[1];

    const totalPrice = cartContext.cart.reduce((accum, val) => accum + val.price, 0);

    const isSubscribed = useRef();
    useEffect(() => {
        isSubscribed.current = true;

        return () => {isSubscribed.current = false}
    }, []);

    const onSubmitClickHandler = e => {
        e.preventDefault();

        setIsLoading(true);
        setShowModal(true);
    };

    const onOrderCloseHandler = e => {
        if (!isSubscribed.current) return;

        let btnName;
        if (e) {
            e.persist();
            btnName = e.target.name;
        }

        const callback = data => {
            console.log(data);
            cartDispatch({type: actions.clean});
            setAlert({success: 'You order is cooking now...'});
            setIsLoading(false);
        };

        if (btnName === 'order') {
            CartService.makeOrder(cartContext.cart, new PizzaPromise(callback));
        } else {
            setIsLoading(false);
        }

        setShowModal(false);
    };

    return <div>
        <CartBrowser
            onSubmitClickHandler={onSubmitClickHandler}
            isLoading={isLoading}
            cartContext={cartContext}
            cartDispatch={cartDispatch}
            total={totalPrice}
        />

        <Order
            show={showModal}
            onClose={onOrderCloseHandler}
            totalPrice={totalPrice + FEE}
        />
    </div>
};

const CartBrowser = (props) => {
    const {onSubmitClickHandler, isLoading, cartContext, cartDispatch, total} = props;

    const onDeleteHandler = id => {
        cartDispatch({
            type: actions.remove,
            item: {id: id}
        });
    };

    const renderCartTable = () =>
        <CartTable items={cartContext.cart} onDelete={onDeleteHandler}/>;

    const renderCartSummary = () =>
        <CartSummary
            total={total}
            deliveryFee={FEE}
            onClickHandler={onSubmitClickHandler}
            isLoading={isLoading}
        />;

    return <Container className={'my-3'}>
        {
            cartContext.cart.length > 0
                ? <div>
                    {renderCartTable()}
                    {renderCartSummary()}
                </div>
                : <h1 className={'display-4 text-center'}>There are no items in cart</h1>
        }
    </Container>
};

/*
* Render table with content
*
* PROPS:
*   items - items that are added to cart
*
* */
const CartTable = (props) => {
    const {items, onDelete} = props;

    const renderHeader = () =>
        <thead>
        <tr>
            <th scope="col" className="border-0 bg-light">
                <div className="p-2 px-3 text-uppercase">Product</div>
            </th>
            <th scope="col" className="border-0 bg-light">
                <div className="py-2 text-uppercase">Price</div>
            </th>
            <th scope="col" className="border-0 bg-light">
                <div className="py-2 text-uppercase">Quantity</div>
            </th>
            <th scope="col" className="border-0 bg-light">
                <div className="py-2 text-uppercase">Remove</div>
            </th>
        </tr>
        </thead>;

    /*
* Render table item
*
* PROPS:
*   image - image url
*   name - name of item
*   category - category name
*   price - price of item
*   amount - amount of item
*   id - id of item
*   onDeleteHandler - on delete item handler
*
* */
    const CartTableItem = (props) => {
        const {image, name, category, price, amount, id, onDeleteHandler} = props;

        return <tbody>
        <tr>
            <th scope="row" className="border-0">
                <div className="p-2">
                    <img src={image} alt="" width="70" className="img-fluid rounded shadow-sm"/>
                    <div className="ml-3 d-inline-block align-middle">
                        <h5 className="mb-0 text-dark d-inline-block align-middle">
                            {name}
                        </h5>
                        <span className="text-muted font-weight-normal font-italic d-block">
                        {category && 'Category: ' + category}
                    </span>
                    </div>
                </div>
            </th>
            <td className="border-0 align-middle"><strong>
                <Currency>{price}</Currency>
            </strong></td>
            <td className="border-0 align-middle"><strong>
                {amount}
            </strong></td>
            <td className="border-0 align-middle">
                <button onClick={() => onDeleteHandler(id)} className={'icon-btn'}>
                    <Trash/>
                </button>
            </td>
        </tr>
        </tbody>
    };

    return <div className={'table-responsive'}>
        <Table>
            {renderHeader()}
            {items.map(item =>
                <CartTableItem
                    image={item.image} name={item.name} category={item.category} price={item.price}
                    amount={item.amount} key={item.id} id={item.id} onDeleteHandler={onDelete}/>
            )}
        </Table>
    </div>
};


/*
* Render summary
*
* PROPS:
*   total - total menu price
*   deliveryFee - fee for delievery
*   onClickHandler - handler for submit button
*   isLoading - loading state
*
* */
const CartSummary = (props) => {
    const {total, deliveryFee, onClickHandler, isLoading} = props;

    const renderBody = () =>
        <ListGroup className={'mb-4'}>
            <ListGroup.Item className="d-flex justify-content-between py-3 border-bottom">
                <strong className="text-muted">Order Subtotal</strong>
                <strong><Currency>{total}</Currency></strong>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between py-3 border-bottom">
                <strong className="text-muted">Delivery cost</strong>
                <strong><Currency>{deliveryFee}</Currency></strong>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between py-3 border-bottom">
                <strong className="text-muted">Total</strong>
                <h5 className={'font-weight-bold'}><Currency>{total + deliveryFee}</Currency></h5>
            </ListGroup.Item>
        </ListGroup>;

    return <Row className="py-5 p-4 bg-white rounded shadow-sm">
        <Col id="order-summary">
            <div className="p-4">
                {renderBody()}
                <Button onClick={onClickHandler} disabled={isLoading} block variant={"danger"}>
                    {isLoading ? <Spinner animation={"grow"} variant={"warning"}/> : 'Procceed to checkout'}
                </Button>
            </div>
        </Col>
    </Row>
};

