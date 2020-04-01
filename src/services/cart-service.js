import {ApiService} from "./api";
import {UserService} from "./user-service";
import {AuthService} from "./auth-service";
import {PizzaPromise} from "../helpers/promise";

export class CartService extends ApiService {
    static makeOrder(items, promiseClass) {
        function handleUserCallback(data) {
            const user = data;
            if (user?.api_token) {
                console.log(user);
                const path = '/user/orders';
                const data = {
                    api_token: user.api_token,
                    items: items
                };
                ApiService.postApiRequest(path, data, promiseClass);
            } else {
                CartService.makeAnonOrder(items, promiseClass)
            }
        }

        const token = AuthService.getToken();
        if (token) {
            UserService.getUserBytToken(AuthService.getToken(), new PizzaPromise(handleUserCallback));
        } else {
            CartService.makeAnonOrder(items, promiseClass);
        }
    }

    static makeAnonOrder(items, promiseClass) {
        const path = '/order/anon';
        this.postApiRequest(path, items, promiseClass);
    }
}
