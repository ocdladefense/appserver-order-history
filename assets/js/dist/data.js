export { getOrderItems, getOrderItemDetails };

function getOrderItems() {
  return fetch("/orderhistory/list/json").then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return data;
  });
}

function getOrderItemDetails(queryId) {
  //8010a00000GBItsAAH
  return fetch("/orderhistory/details/json/" + queryId).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return data;
  });
}