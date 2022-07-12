export { getOrderItems, getOrderItemDetails };

function getOrderItems() {
  return fetch("/orderhistory/list/json").then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return data;
  });
}

function getOrderItemDetails(queryId) {
  return fetch("orderhistory/details/json/8010a00000GBItsAAH").then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return data;
  });
}