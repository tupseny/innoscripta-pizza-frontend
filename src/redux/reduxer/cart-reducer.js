export const initializer = () => {
    return {cart: []};
};

export const actions = {
    updateAmount: 'UPDATE',
    remove: 'REMOVE',
    clean: 'CLEAN',
};

export const cartReducer = (state, action) => {
    const {cart} = state;

    switch (action.type) {
        case actions.updateAmount:
            return genNewState({cart: addToCart(action.item, cart)});
        case actions.remove:
            const id = action.item.id;
            const newState = genNewState({cart: removeFromCart(id, cart)});
            return newState;
        case actions.clean:
            return {cart: []};
        default:
            throw new Error('Not allowed action')
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
