export { getOrderItems, getOrderItemDetails };



function getOrderItems() {
    return fetch("/orderhistory/list/json")
    .then(resp => resp.json())
    .then(data => {return data;});
}

function getOrderItemDetails(queryId) {
    //8010a00000GBItsAAH
    return fetch("/orderhistory/details/json/" + queryId)
    .then(resp => resp.json())
    .then(data => {return data;});
}




