import React, {useContext, useEffect} from "react";
import {AlertContext} from "../../redux/context";

export const PizzaAlert = (props) => {
    const {timeout} = props;
    const [state, setState] = useContext(AlertContext);

    const style = {right: '30%', left: '30%', bottom: '10%'};

    function clearAlert(){
        setState({success: '', error: ''});
    }

    useEffect(() => {
        const timer = setTimeout(() => clearAlert(), timeout);

        return () => {clearTimeout(timer)}
    });

    let className = 'text-center fixed-bottom alert';
    let body = null;
    if (state.error){
        className += ' alert-danger';        body = (<div style={style} className={className}>{state.error}</div>)
    }else if(state.success){
        className += ' alert-success';
        body = (<div style={style} className={className}>{state.success}</div>)
    }

    return body;
};
