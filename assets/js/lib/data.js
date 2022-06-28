export { getOrderItems, getOrderItemDetails };

function getOrderItems() {
  return fetch("/orderhistory/list/json").then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return data;
  });
}

function getOrderItemDetails(queryId) {
  /*
  return fetch("/example/details/" + queryId)
  .then(resp => resp.json())
  .then(data => {return data;});*/
  return false;
}