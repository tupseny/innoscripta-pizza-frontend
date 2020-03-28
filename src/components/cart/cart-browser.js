import {Button, Col, Container, ListGroup, Row, Spinner, Table} from "react-bootstrap";
import React, {useContext, useState} from "react";
import {Dollar} from "../other";
import {Trash} from "bootstrap-icons-react";
import {CartContext} from "../../redux/context";
import {actions} from "../../redux/reduxer/cart-reducer";

const FEE = 5;

export const CartBrowser = () => {
    const [cartContext, cartDispatch] = useContext(CartContext);
    const [isLoading, setIsLoding] = useState(false);

    function calcTotalPrice() {
        return cartContext.cart.reduce((accum, val) => accum + val.price, 0);
    }

    const onSubmitClickHandler = () => {

    };

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
            total={calcTotalPrice()}
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
                <Dollar>{price}</Dollar>
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
                <strong><Dollar>{total}</Dollar></strong>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between py-3 border-bottom">
                <strong className="text-muted">Delivery cost</strong>
                <strong><Dollar>{deliveryFee}</Dollar></strong>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between py-3 border-bottom">
                <strong className="text-muted">Total</strong>
                <h5 className={'font-weight-bold'}><Dollar>{total + deliveryFee}</Dollar></h5>
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

