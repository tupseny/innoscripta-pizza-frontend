import {ApiService} from "./api";
import {UserService} from "./user-service";
import {AuthService} from "./auth-service";

export class CartService extends ApiService {
    static makeOrder(items, successCallback, errorCallback) {
        function handleUserPromise(data) {
            const user = data;
            if (user.api_token) {
                console.log(user);
                const path = '/order';
                const data = {
                    api_token: user.api_token,
                    items: items
                };
                ApiService.postApiRequest(path, data, successCallback, errorCallback);
            } else {
                CartService.makeAnonOrder(items, successCallback, errorCallback)
            }
        }

        const token = AuthService.getToken();
        if (token) {
            UserService.getUserBytToken(AuthService.getToken(), handleUserPromise, errorCallback);
        } else {
            CartService.makeAnonOrder(items, successCallback, errorCallback);
        }
    }

    static makeAnonOrder(items, successCallback, errorCallback) {
        const path = '/order/anon';
        this.postApiRequest(path, items, successCallback, errorCallback);
    }
}
