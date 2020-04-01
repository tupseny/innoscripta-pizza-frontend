import {ApiService} from "./api";

export class MenuService extends ApiService{
    static fetchMenu(promiseClass){
        const path = '/menu';

        this.getApiRequest(path, null, promiseClass);
    }

    static fetchMeal(id, promiseClass){
        const path = '/menu/' + id;

        this.getApiRequest(path, null, promiseClass);
    }
}
