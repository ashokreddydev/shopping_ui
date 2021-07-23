interface ServiceRequest {
    url: string,
    payload?: Object
}



//reducers

interface ActionTypes {
    type: string,
    payload: Object
}

interface RootState {
    products:Array,
    cart:Array

}

interface getProductsPayload {
    size?:string,
    sortPrice?:number

}




