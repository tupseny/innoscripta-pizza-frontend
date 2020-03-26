import {ApiService} from "./api";

export class MenuService extends ApiService{
    static fetchMenu(successCallback, errorCallback){
        const path = '/menu';

        this.getRequest(path, null, successCallback, errorCallback);
    }

    static fetchMeal(id, successCallback, errorCallback){
        const path = '/menu/' + id;

        this.getRequest(path, null, successCallback, errorCallback);
    }
}
