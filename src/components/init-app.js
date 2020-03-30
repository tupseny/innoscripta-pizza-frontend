import React, {useContext} from "react";
import {UserContext} from "../redux/context";
import {AuthService} from "../services/auth-service";
import {UserService} from "../services/user-service";

export const InitApp = () => {
    return <UpdateUser/>
};

const UpdateUser = () => {
    const [user, setUser] = useContext(UserContext);

    if (AuthService.getToken() !== null && Object.keys(user).length === 0) {
        const handleNewUser = (data) => {
            if (data?.api_token) {
                setUser(data);
            } else {
                AuthService.logout();
            }
        };

        const handleError = (err) => {
            AuthService.logout();
            console.log(err);
        };

        UserService.getUserBytToken(AuthService.getToken(), handleNewUser);
    }

    return null;
};
