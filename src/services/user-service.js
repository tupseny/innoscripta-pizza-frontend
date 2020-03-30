import {ApiService} from "./api";

export class UserService {
    static getUserBytToken($token, $callback) {
        const path = '/user?api_token=' + $token;

        ApiService.getApiRequest(path, null, $callback)
    }
}
