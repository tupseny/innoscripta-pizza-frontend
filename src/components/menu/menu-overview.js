import React, {useEffect, useState} from "react";
import {API_URL} from "../../helpers/config";
import {Group} from "./menu-group";
import {Col, Row, Spinner} from "react-bootstrap";
import {MenuService} from "../../services/menu-service";

export const Overview = () => {
    const ITEMS_KEY = 'menu-groups';

    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem(ITEMS_KEY));
        if (items) {
            setItems(items);
            setIsLoaded(true)
        }
    }, []);

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

    const renderLoading = () => <Spinner className={'m-auto mt-5'} animation={"border"} variant={"warning"}/>;

    const renderGroups = () =>
        isLoaded ? items ? items.map(item =>
            <Col key={item.id} xl={6} className={'pt-3'}><Group id={item.id} name={item.name}/></Col>
        ) : null : renderLoading();

    return <Row>
        {renderGroups()}
    </Row>
};
