import {ApiService} from "./api";

export class CartService extends ApiService{
    static makeOrder(items, successCallback, errorCallback){
        const path = '/order';

        this.postRequest(path, items, successCallback, errorCallback);
    }
}
