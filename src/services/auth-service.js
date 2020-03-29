import {ApiService} from "./api";

export class AuthService extends ApiService {
    static register(data, successCallback, errorCallback) {
        const path = '/register';

        this.postRequest(path, data, successCallback, errorCallback);
    }

    static saveToken(token) {
        localStorage.setItem('token', token);
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static isLogged() {
        return !!this.getToken();
    }
}
