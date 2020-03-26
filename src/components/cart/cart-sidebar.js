import React, {useContext, useState} from "react";
import {Button, Container, Nav, Spinner} from "react-bootstrap";
import {AlertContext, MenuContext} from "../../redux/context";
import {Sidebar} from "../navigation/sidebar/sidebar";
import {CartItems, PriceSum} from "./cart-body";
import {CartService} from "../../services/cart-service";


export const CartSidebar = (props) => {
    const {isVisible, onHideHandler} = props;
    const state = useContext(MenuContext)[0];

    const renderTitle = () =>
        <PriceSum items={state.cart} className={''}/>;


    const renderSidebar = () =>
        <Sidebar isVisible={isVisible} onHide={onHideHandler} title={renderTitle()}>
            <CartContent items={state.cart}/>
        </Sidebar>;

    return renderSidebar();
};

const CartContent = (props) => {
    const {items} = props;
    const amount = items.length;
    const [isLoading, setIsLoading] = useState(false);
    const setAlert = useContext(AlertContext)[1];

    const onClickHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);

        console.log(items);
        const successCallback = (data) => {
            console.log(data);
            if (data[0] === 'success'){
                setAlert({success: 'You have successfully made the order!'})
            }
            setIsLoading(false);
        };

        const errorCallback = (err) => {
            console.log(err.toString());
            setAlert({error: 'Error'});
            setIsLoading(false);
        };

        CartService.makeOrder(items, successCallback, errorCallback);
    };

    const renderContent = () =>
        <CartItems items={items}/>;


    return <Container>
        {renderContent()}
        <CartSubmitButton isLoading={isLoading} isDisabled={amount === 0} onClickHandler={onClickHandler}/>
    </Container>
};

const CartSubmitButton = (props) => {
    const {isDisabled, onClickHandler, isLoading} = props;

    return <Button className={'mt-3 btn-block'} onClick={onClickHandler} disabled={isDisabled || isLoading}>
        {isLoading ? <Spinner animation={"grow"}/> : 'Make order'}
    </Button>;
};
