import {useContext} from "react";
import {AlertContext} from "../redux/context";

export const handleErrors = response => {
    if (!response.ok){
        console.error(response.statusText);
    }

    return response;
};
