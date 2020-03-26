import React, {useReducer, useState} from "react";
import {Overview} from "./menu-overview";
import {CartSidebar} from "../cart/cart-sidebar";
import {initializer, initialState, menuReducer} from "../../redux/reduxer/menu-reducer";
import {MenuContext} from "../../redux/context";
import {Button} from "react-bootstrap";
import {Arrow90degLeft, ArrowBarLeft, Bucket} from "bootstrap-icons-react";

export const Menu = () => {
    const context = useReducer(menuReducer, undefined, initializer);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const onSidebarHide = () => {
        setIsSidebarVisible(false);
    };

    const onToggleClick = (e) => {
        e.preventDefault();
        setIsSidebarVisible(!isSidebarVisible);
    };

    return <MenuContext.Provider value={context}>
        <div className={'d-flex justify-content-end'}>
            <ToggleSidebarButton isVisible={true} onClickHandler={onToggleClick}/>
            <CartSidebar isVisible={isSidebarVisible} onHideHandler={onSidebarHide}/>
        </div>
        <Overview/>
    </MenuContext.Provider>
};

const ToggleSidebarButton = (props) => {
    const {isVisible, onClickHandler} = props;

    return <Button className={''} onClick={onClickHandler} hidden={!isVisible}><ArrowBarLeft className={'mr-1'}/><span>Cart</span></Button>
};
