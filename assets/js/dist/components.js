/** @jsx vNode */

/**

This is our list of components to be used in the app.

**/
export { OrderListFull, OrderList, DetailedListFull, getOrderItems, getOrderItemDetails };
import { vNode } from '../../../node_modules/@ocdladefense/view/view.js';
import { CACHE, HISTORY } from '../../../node_modules/@ocdladefense/view/cache.js';
import { dateFormat, moneyFormat } from './format.js'; //for the list of orders these are used

var OrderListFull = function OrderListFull(props) {
  if (props.orders.length <= 0) {
    return vNode("div", null, vNode("h2", null, "No Orders Found for this Account"));
  }

  var orders = props.orders[0];
  var billingName = "";

  if (orders.BillToContact) {
    billingName = orders.BillToContact.Name;
  }

  return vNode("div", null, vNode("h2", null, "Order History for ", billingName), vNode(OrderList, {
    orders: props.orders
  }));
};

var OrderList = function OrderList(props) {
  var orders = props.orders;
  var ordersFormatted = [];

  for (var i = 0; i < orders.length; i++) {
    var isEven = i % 2 == 0;
    ordersFormatted.push(vNode(OrderListItem, {
      order: orders[i],
      even: isEven
    }));
  }

  return vNode("table", {
    "class": "flex-parent order-list"
  }, vNode("tr", {
    "class": "tr-table-row should-be-invisible table-headers"
  }, vNode("td", {
    "class": "td-table-cell"
  }, "Order #:"), vNode("td", {
    "class": "td-table-cell"
  }, "Date Ordered:"), vNode("td", {
    "class": "td-table-cell"
  }, "Account:"), vNode("td", {
    "class": "td-table-cell"
  }, "Bill To:"), vNode("td", {
    "class": "td-table-cell"
  }, "Ship To:"), vNode("td", {
    "class": "td-table-cell"
  }, "Total:")), ordersFormatted);
};

var OrderListItem = function OrderListItem(props) {
  var order = props.order;
  var isEven = props.even;
  var date = "NA";

  if (order.EffectiveDate) {
    date = dateFormat(order.EffectiveDate);
  }

  var accountName = "NA";

  if (order.Account) {
    accountName = order.Account.Name;
  }

  var shippingName = "NA";
  var orderShippingNode = vNode("p", null, "NA");

  if (order.ShipToContact) {
    shippingName = order.ShipToContact.Name;
    orderShippingNode = vNode("a", {
      target: "_blank",
      href: "/directory/members/" + order.ShipToContactId
    }, shippingName);
  }

  var billingName = "NA";
  var orderBillingNode = vNode("p", null, "NA");

  if (order.BillToContact) {
    billingName = order.BillToContact.Name;
    orderBillingNode = vNode("a", {
      target: "_blank",
      href: "/directory/members/" + order.BillToContactId
    }, billingName);
  }

  var fn = function fn(e) {
    e.recordId = e.currentTarget.dataset && e.currentTarget.dataset.recordId;
    e.frameworkDetail = e.currentTarget.dataset;
    e.action = e.currentTarget.dataset.action;
    console.log(e.recordId);
  };

  function loadOrder(e) {
    console.log(e.target);
    var theList = getOrderItemDetails(e.dataset.orderId);
    Promise.all([theList]).then(function (data) {
      var initTree = vNode(DetailedListFull, {
        orderItems: data[0]
      });
      view.update(initTree);
    }); //return initTree;
  } //TODO: Links are clickable even if they are NA href={"/orderhistory/details/"+order.Id}  target="_blank"


  return vNode("tr", {
    "class": isEven ? "order tr-table-row" : "order tr-table-row orderedItemGrey",
    "data-record-id": order.Id
  }, vNode("td", {
    "class": "td-table-cell order-number"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Order #: "), vNode("a", {
    "class": "testEventClass",
    href: "#",
    "data-action": "loadOrder",
    "data-record-id": order.Id,
    onclick: loadOrder
  }, order.OrderNumber)), vNode("td", {
    "class": "td-table-cell order-effective"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Date Ordered: "), date), vNode("td", {
    "class": "td-table-cell account-id"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Account: "), accountName), vNode("td", {
    "class": "td-table-cell order-bill"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Bill To: "), orderBillingNode), vNode("td", {
    "class": "td-table-cell order-ship"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Ship To: "), orderShippingNode), vNode("td", {
    "class": "td-table-cell order-total"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Total Amount: "), moneyFormat(order.TotalAmount)));
}; //When you click on an order, these are used:
//need to seperate these based on the id they were clicked on


var DetailedListFull = function DetailedListFull(props) {
  //let detail = props.orderItems;
  var order = props.orderItems[0];
  var activeDate = "No Date"; //this isnt getting used

  if (order.Order.ActivatedDate) {
    activeDate = order.Order.ActivatedDate.split('T')[0];
  }

  var accountName = "No Account Connected";

  if (order.Order.Account) {
    accountName = order.Order.Account.Name;
  }

  var shippingName = "No Shipping Name";

  if (order.Order.ShipToContact) {
    shippingName = order.Order.ShipToContact.Name;
  }

  var billingName = "No Billing Name";

  if (order.Order.BillToContact) {
    billingName = order.Order.BillToContact.Name;
  } //Order.EffectiveDate, activeDate, accountName, billingName, shippingName, Order.TotalAmount, Order.OrderNumber


  return vNode("div", null, vNode("div", null, vNode("a", {
    "class": "return-link",
    href: "/orderhistory/list"
  }, "Return to Order List"), vNode("div", {
    "class": "title-container"
  }, vNode("div", {
    "class": "title-left"
  }, vNode("h2", {
    "class": "margin-maker-2"
  }, "Order #", order.Order.OrderNumber), vNode("h2", {
    "class": "margin-maker"
  }, accountName), vNode("h2", null, "Date: ", dateFormat(order.Order.EffectiveDate))), vNode("div", {
    "class": "title-right"
  }, vNode("h2", null, "Total Amount: ", moneyFormat(order.Order.TotalAmount)), vNode("h2", null, "Billing Name: ", billingName), vNode("h2", null, "Shipping Name: ", shippingName))), vNode(OrderItemsList, {
    orderItems: props.orderItems
  })));
};

var OrderItemsList = function OrderItemsList(props) {
  var orderItems = props.orderItems;
  var orderItemsFormatted = [];

  for (var i = 0; i < orderItems.length; i++) {
    var isEven = i % 2 == 0;
    orderItemsFormatted.push(vNode(OrderItemListItem, {
      orderItem: orderItems[i],
      even: isEven
    }));
  }

  return vNode("table", {
    "class": "flex-parent contact-list",
    id: "contactList3"
  }, vNode("tr", {
    "class": "tr-table-row should-be-invisible table-headers"
  }, vNode("td", {
    "class": "td-table-cell"
  }, "Product"), vNode("td", {
    "class": "td-table-cell"
  }, "Name"), vNode("td", {
    "class": "td-table-cell"
  }, "Expiration Date"), vNode("td", {
    "class": "td-table-cell"
  }, "Unit Price"), vNode("td", {
    "class": "td-table-cell"
  }, "Quantity"), vNode("td", {
    "class": "td-table-cell"
  }, "Total Amount")), orderItemsFormatted);
};

var OrderItemListItem = function OrderItemListItem(props) {
  var orderItem = props.orderItem;
  var isEven = props.even;
  var productName = "NA";
  var productLinkId = "";

  if (orderItem.Product2) {
    //OrderItem.Product2.IsActive
    productName = orderItem.Product2.Name;

    if (orderItem.Product2.IsActive) {
      if (orderItem.Product2.ClickpdxCatalog__IsOption__c) {
        var productLinkUrl = "https://ocdpartial-ocdla.cs198.force.com/OcdlaProduct?id=" + orderItem.Product2.ClickpdxCatalog__ParentProduct__c;
        productLinkId = vNode("a", {
          target: "_blank",
          href: productLinkUrl
        }, productName);
      } else {
        var _productLinkUrl = "https://ocdpartial-ocdla.cs198.force.com/OcdlaProduct?id=" + orderItem.Product2Id;

        productLinkId = vNode("a", {
          target: "_blank",
          href: _productLinkUrl
        }, productName);
      }
    } else {
      productLinkId = vNode("div", null, productName);
    }
  } else {
    productLinkId = vNode("div", null, productName);
  }

  var fullName = "NA";

  if (orderItem.FirstName__c && orderItem.LastName__c) {
    fullName = orderItem.FirstName__c + " " + orderItem.LastName__c;
  }

  var totalPrice = "NA";

  if (orderItem.TotalPrice) {
    totalPrice = orderItem.TotalPrice;
  } //will need something to check if product doesnt exist dont put it as link


  return vNode("tr", {
    "class": isEven ? "tr-table-row" : "tr-table-row orderedItemGrey"
  }, vNode("td", {
    "class": "td-table-cell order-bill"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Product: "), productLinkId), vNode("td", {
    "class": "td-table-cell account-id"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Name: "), fullName), vNode("td", {
    "class": "td-table-cell account-id"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Expiration Date: "), dateFormat(orderItem.ExpirationDate__c)), vNode("td", {
    "class": "td-table-cell order-total"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Unit Price: "), moneyFormat(orderItem.UnitPrice)), vNode("td", {
    "class": "td-table-cell account-id"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Quantity: "), orderItem.Quantity.toString()), vNode("td", {
    "class": "td-table-cell order-total"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Total Amount: "), moneyFormat(totalPrice)));
}; //data.js


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
/*
const OrderItemsListTemp = function(props) {

    let orderItems = props.orderItems;
  
    let orderItemsFormatted = [];
    for (let i = 0; i < orderItems.length; i++) {
        orderItemsFormatted.push(<OrderItemListItemTemp orderItem={orderItems[i]} />);
    }
  
    return (
      <div class="flex-parent">
        {orderItemsFormatted}
      </div>
    )
};


const OrderItemListItemTemp = function(props) {

    let orderItem = props.orderItem;

    let productName = "NA";
    let productLinkId = "";
    if (orderItem.Product2) {
        productName = orderItem.Product2.Name;
        if (orderItem.Product2.ClickpdxCatalog__IsOption__c) {
            productLinkId = orderItem.Product2.ClickpdxCatalog__ParentProduct__c;
        }
        else {
            productLinkId = orderItem.Product2Id;
        }
    }
    let accountName = "NA";
    if (orderItem.Contact__r) {
        if (orderItem.Contact__r.Account) {
            accountName = orderItem.Contact__r.Account.Name;
        }
    }
    let fullName = "NA";
    if (orderItem.FirstName__c && orderItem.LastName__c) {
        fullName = orderItem.FirstName__c + " " + orderItem.LastName__c;
    }
    let totalPrice = "NA";
    if (orderItem.TotalPrice) {
        totalPrice = orderItem.TotalPrice;
    }
    else if (orderItem.UnitPrice && orderItem.Quantity) {
        totalPrice = orderItem.UnitPrice + orderItem.Quantity;
    }
    
    //will need something to check if product doesnt exist dont put it as link
    return (
      <div class="orderedItem">
        <span className="disappear-when-big">Product: </span><a target="_blank" href={"https://ocdpartial-ocdla.cs198.force.com/OcdlaProduct?id="+productLinkId}>{productName}</a>
        <span className="disappear-when-big">Account: </span>{accountName}
        <span className="disappear-when-big">Name: </span>{fullName}
        <span className="disappear-when-big">Expiration Date: </span>{dateFormat(orderItem.ExpirationDate__c)}
        <span className="disappear-when-big">Unit Price: </span>{"$"+orderItem.UnitPrice}
        <span className="disappear-when-big">Quantity: </span>{orderItem.Quantity}
        <span className="disappear-when-big">Total Amount: </span>{"$"+totalPrice}
      </div>
    )

};
*/