import {ApiService} from "./api";

export class AuthService extends ApiService {
    static register(data, successCallback, errorCallback) {
        const path = '/register';

        this.postApiRequest(path, data, successCallback, errorCallback);
    }

    static authenticate(data, successCallback, errorCallback){
        const path = '/login';

        this.postApiRequest(path, data, successCallback, errorCallback);
    }

    static saveToken(token) {
        localStorage.setItem('token', token);
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static logout(){
        const path = '/logout';
        this.postApiRequest(path);
        localStorage.removeItem('token');
    }
}
