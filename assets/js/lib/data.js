export { getOrderItems, getOrderItemDetails };

function getOrderItems() {
  return fetch("/example/list/json").then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return data;
  });
}

function getOrderItemDetails(queryId) {
  return fetch("/example/details/" + queryId).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return data;
  });
}