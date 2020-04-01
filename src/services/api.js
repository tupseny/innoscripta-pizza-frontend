import {handleErrors} from "../helpers/error-handler";

const API = '/api';

export class ApiService {
    static _apiRequest(path, method, data, headers, promiseClass) {
        const url = API + path;
        this._request(url, method, data, headers, promiseClass)
    }

    static _request(path, method, data, headers, promiseClass) {
        const _headers = {'Accept': 'application/json'};

        data = data && (typeof data === 'string' ? data : JSON.stringify(data));

        Object.assign(_headers, headers);

        const options = {
            method: method,
            headers: _headers,
            ...data && {body: data},
        };

        const promise = fetch(path, options)
            .then(handleErrors);

        if (promiseClass){
            promise.then(promiseClass.handle);
        }
    }

    static getRequest(path, data = null, promiseClass = undefined) {
        this._request(path, 'GET', data, null, promiseClass)
    }

    static postRequest(path, data = null, promiseClass = undefined) {
        const headers = {'Content-Type': 'application/json'};
        this._request(path, 'POST', data, headers, promiseClass)
    }

    static getApiRequest(path, data = null, promiseClass = undefined) {
        this._apiRequest(path, 'GET', data, null, promiseClass)
    }

    static postApiRequest(path, data = null, promiseClass = undefined) {
        const headers = {'Content-Type': 'application/json'};

        this._apiRequest(path, 'POST', data, headers, promiseClass)
    }
}
