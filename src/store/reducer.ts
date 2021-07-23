import { GET_PRODUCTS, ADD_CART } from './ActionTypes'

export const initialState: RootState = {
    products: [],
    cart: []

}

const reducer = (
    state: RootState = initialState,
    action: ActionTypes
): RootState => {

    if (action.type === GET_PRODUCTS) {
        return {
            ...state,
            products: action.payload
        };
    } else if (action.type === ADD_CART) {
        return {
            ...state,
            cart: action.payload
        };
    }
    else {
        return state;
    }



}

export default reducer;