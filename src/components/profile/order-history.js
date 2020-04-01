import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row, Spinner, Table} from "react-bootstrap";
import {Currency, Dollar} from "../other";
import {UserService} from "../../services/user-service";
import {AlertContext, UserContext} from "../../redux/context";
import {PizzaPromise} from "../../helpers/promise";
import {AuthService} from "../../services/auth-service";
import {Redirect} from "react-router";
import {CONFIG} from "../../helpers/config";

export const OrderHistory = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useContext(UserContext);
    const setAlert = useContext(AlertContext)[1];

    const renderItems = () => {
        return items
            ? items.map((item, index) =>
                <OrderHistoryItem key={index} id={index + 1} items={item}/>)
            : <h1 className={'display-1'}>You don\'t have any orders</h1>
    };

    useEffect(() => {
        let isSubscribed = true;

        const callback = (data) => {
            if (!isSubscribed) return;

            setItems(data);
            setIsLoading(false);
            console.log(data);
        };

        const error = (err) => {
            if (!isSubscribed) return;
            if (err.code === 401) {
                setUser({});
                AuthService.logout();
                setAlert({error: 'Don\' have permissions'});
                setItems([]);
            }
            setIsLoading(false);
        };

        if (user.api_token)
            UserService.fetchOrders(user.api_token, new PizzaPromise(callback, error));
        else setItems([]);

        return () => {
            isSubscribed = false
        }

    }, [user]);

    return Object.keys(user).length > 0 ? (
            <Container className={'mx-5 my-3'}>
                {isLoading
                    ? <Spinner className={'d-flex justify-content-center'} animation={'border'}
                               variant={'warning'}/>
                    : <Table borderless>
                        <tbody>
                        {renderItems()}
                        </tbody>
                    </Table>}
            </Container>)
        : <Redirect to={CONFIG.paths.login}/>;

};

const OrderHistoryItem = (props) => {
    const {id, items} = props;

    const OrderRow = (props) => {
        const {name, price, amount} = props;

        return <tr>
            <td>
                <h4>{name}</h4>
            </td>
            <td className="text-center"><Currency>{price}</Currency></td>
            <td className="text-center">{amount}</td>
        </tr>
    };

    return <tr>
        <th>
            <h1>{id}#</h1>
        </th>

        <td>
            <Table responsive size={'sm'}>
                <tbody>
                {items.map((item) => <OrderRow name={item.name} price={item.price} amount={item.amount}/>)}
                </tbody>
            </Table>
        </td>
    </tr>;
};

