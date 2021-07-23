import { Api } from './services';
import { GET_PRODUCTS ,ADD_CART} from './ActionTypes'

// interface data {
//     list: []

// }
// export const data = (data: data) => {
//     return async (dispatch: any) => {
//         const request: ServiceRequest = {
//             url: ""
//         }
//         const resp = await Api.get(request);
//         dispatch({ type: TEST, DATA: [] })

//     }
// }
export const getProducts = (payload: any) => {
    return async (dispatch: any) => {
        const qs = Object.keys(payload)
        .map(key => `${key}=${payload[key]}`)
        .join('&');
        const url = 'getProducts?'+qs;
        const list:any = await Api.get({ url })
        if(list.status === 200 && list.success)
        {
            dispatch({ type: GET_PRODUCTS, payload: list.data })            
        }
    }

}

export const AddCart = (ID: String) => {
    return async (dispatch: any) => {
        const url = 'addCart/'+ID;
        const list:any = await Api.get({ url })
        if(list.status === 200 && list.success)
        {
            dispatch({ type: ADD_CART, payload: list.data })            
        }
    }

}

export const deleteCart = (ID: String) => {
    return async (dispatch: any) => {
        const url = 'deleteCart/'+ID;
        const list:any = await Api.delete({ url })
        if(list.status === 200 && list.success)
        {
            dispatch({ type: ADD_CART, payload: list.data })            
        }
    }

}