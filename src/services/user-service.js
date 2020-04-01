import {ApiService} from "./api";

export class UserService {
    static getUserBytToken(token, promiseClass) {
        const path = '/user?api_token=' + token;

        ApiService.getApiRequest(path, null, promiseClass)
    }

    static fetchOrders(token, promiseClass){
        const path = '/user/orders?api_token=' + token;

        ApiService.getApiRequest(path, null, promiseClass)
    }
}
