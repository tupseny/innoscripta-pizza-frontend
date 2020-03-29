const API = '/api';

export class ApiService {
    static _apiRequest(path, method, data, headers, successCallback, errorCallback) {
        const url = API + path;
        this._request(url, method, data, headers, successCallback, errorCallback)
    }

    static _request(path, method, data, headers, successCallback, errorCallback) {
        const _headers = {'Accept': 'application/json'};

        data = data && (typeof data === 'string' ? data : JSON.stringify(data));

        Object.assign(_headers, headers);

        const options = {
            method: method,
            headers: _headers,
            ...data && {body: data},
        };

        fetch(path, options)
            .then(res => res.json())
            .then(successCallback)
            .catch(errorCallback);
    }

    static getRequest(path, data = null, successCallback = undefined, errorCallback = undefined) {
        this._request(path, 'GET', data, null, successCallback, errorCallback)
    }

    static postRequest(path, data = null, successCallback = undefined, errorCallback = undefined) {
        const headers = {'Content-Type': 'application/json'};
        this._request(path, 'POST', data, headers, successCallback, errorCallback)
    }

    static getApiRequest(path, data = null, successCallback = undefined, errorCallback = undefined) {
        this._apiRequest(path, 'GET', data, null, successCallback, errorCallback)
    }

    static postApiRequest(path, data = null, successCallback = undefined, errorCallback = undefined) {
        const headers = {'Content-Type': 'application/json'};

        this._apiRequest(path, 'POST', data, headers, successCallback, errorCallback)
    }
}
