import {CART_KEY} from "../../components/cart/cart-browser";


export const cartInitializer = () => {
    let cart = JSON.parse(localStorage.getItem(CART_KEY));
    if (!cart) {
        cart = {cart: []}
    }

    return cart;

    // return {cart: [
    //         {name: 'Margarita', amount: 3, price: 72, category: 'Pizza', id: 1},
    //         {name: 'Ferrita', amount: 1, price: 5, category: 'Pizza', id: 2},
    //         {name: 'Coca-cola', amount: 1, price: 123, category: 'Drinks', id: 3}
    //     ]};
};

export const actions = {
    updateAmount: 'UPDATE',
    remove: 'REMOVE',
    clean: 'CLEAN',
};

export const cartReducer = (state, action) => {
    const {cart} = state;

    let newState = [];
    switch (action.type) {
        case actions.updateAmount:
            newState = genNewState({cart: addToCart(action.item, cart)});
            break;
        case actions.remove:
            const id = action.item.id;
            newState = genNewState({cart: removeFromCart(id, cart)});
            break;
        case actions.clean:
            newState = {cart: []};
            break;
        default:
            throw new Error('Not allowed action')
    }

    saveNewState(newState);
    return newState;

    function saveNewState(state){
        localStorage.setItem(CART_KEY, JSON.stringify(state))
    }

    function genNewState(obj) {
        const stateCopy = Object.assign({}, state);
        return Object.assign(stateCopy, obj);
    }
};

function removeFromCart(id, cart) {
    return cart.filter((item) => item.id !== id);
}

function addToCart(item, cart) {
    const {id, amount} = item;

    const foundItemIndex = cart.findIndex((item) => item.id === id);

    if (foundItemIndex > -1) {
        if (amount > 0){
            cart[foundItemIndex].amount = amount;
        }else{
            cart.splice(foundItemIndex, 1);
        }
    } else {
        cart.push(item)
    }

    return cart;
}
