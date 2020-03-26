export class ApiService {
    static api = '/api';

    static _apiRequest(path, method, data, headers, successCallback, errorCallback) {
        const url = API + path;
        const _headers = {'Accept': 'application/json'};

        data = data && (typeof data === 'string' ? data : JSON.stringify(data));

        Object.assign(_headers, headers);

        const options = {
            method: method,
            headers: _headers,
            ...data && {body: data},
        };

        fetch(url, options)
            .then(res => res.json())
            .then(successCallback)
            .catch(errorCallback);
    }

    static getRequest(path, data = null, successCallback = undefined, errorCallback = undefined) {
        this._apiRequest(path, 'GET', data, null, successCallback, errorCallback)
    }

    static postRequest(path, data = null, successCallback = undefined, errorCallback = undefined) {
        this._apiRequest(path, 'POST', data, null, successCallback, errorCallback)
    }
}
