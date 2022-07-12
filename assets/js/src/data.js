export { getOrderItems, getOrderItemDetails };



function getOrderItems() {
    return fetch("/orderhistory/list/json")
    .then(resp => resp.json())
    .then(data => {return data;});
}

function getOrderItemDetails(queryId) {
    return fetch("orderhistory/details/json/8010a00000GBItsAAH")
    .then(resp => resp.json())
    .then(data => {return data;});
}




