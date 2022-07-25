/** @jsx vNode */

/**

This is our list of components to be used in the app.

**/
export { OrderListFull, OrderList, DetailedListFull };
import { vNode } from '../../../node_modules/@ocdladefense/view/view.js';
import { CACHE, HISTORY } from '../../../node_modules/@ocdladefense/view/cache.js';
import { cityFormatter, stateFormatter, createMemberX } from './contactFieldFormat.js'; //for the list of orders these are used

var OrderListFull = function OrderListFull(props) {
  if (props.orders.length <= 0) {
    return vNode("div", null, vNode("h2", null, "No Orders Found for this Account"));
  }

  var orders = props.orders[0];
  var billingName = "";

  if (orders.BillToContact) {
    billingName = orders.BillToContact.Name;
  }

  return vNode("div", null, vNode("div", null, vNode("h2", null, "Order History for ", billingName)), vNode(OrderList, {
    orders: props.orders
  }));
};

var OrderList = function OrderList(props) {
  var orders = props.orders;
  var ordersFormatted = [];

  for (var i = 0; i < orders.length; i++) {
    ordersFormatted.push(vNode(OrderListItem, {
      order: orders[i]
    }));
  }

  return vNode("div", {
    "class": "flex-parent contact-list",
    id: "contactList3"
  }, vNode("ul", {
    "class": "table-row should-be-invisible table-headers"
  }, vNode("li", {
    "class": "table-cell"
  }, "Order Number"), vNode("li", {
    "class": "table-cell"
  }, "Account"), vNode("li", {
    "class": "table-cell"
  }, "Activated Date"), vNode("li", {
    "class": "table-cell"
  }, "Effective Date"), vNode("li", {
    "class": "table-cell"
  }, "Ship To Contact"), vNode("li", {
    "class": "table-cell"
  }, "Bill To Contact"), vNode("li", {
    "class": "table-cell"
  }, "Total Amount")), ordersFormatted);
};

var OrderListItem = function OrderListItem(props) {
  var order = props.order;
  var activeDate = "NA";

  if (order.ActivatedDate) {
    activeDate = order.ActivatedDate.split('T')[0];
  }

  var accountName = "NA";

  if (order.Account) {
    accountName = order.Account.Name;
  }

  var shippingName = "NA";

  if (order.ShipToContact) {
    shippingName = order.ShipToContact.Name;
  }

  var billingName = "NA";

  if (order.BillToContact) {
    billingName = order.BillToContact.Name;
  } //TODO: Links are clickable even if they are NA


  return vNode("ul", {
    "class": "table-row"
  }, vNode("li", {
    "class": "table-cell order-number"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Order Number: "), vNode("a", {
    target: "_blank",
    href: "/orderhistory/details/" + order.Id
  }, order.OrderNumber)), vNode("li", {
    "class": "table-cell account-id"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Account: "), accountName), vNode("li", {
    "class": "table-cell order-activate"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Activated Date: "), activeDate), vNode("li", {
    "class": "table-cell order-effective"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Effective Date: "), order.EffectiveDate), vNode("li", {
    "class": "table-cell order-ship"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Ship To Contact: "), vNode("a", {
    target: "_blank",
    href: "/directory/members/" + order.ShipToContactId
  }, shippingName)), vNode("li", {
    "class": "table-cell order-bill"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Bill To Contact: "), vNode("a", {
    target: "_blank",
    href: "/directory/members/" + order.BillToContactId
  }, billingName)), vNode("li", {
    "class": "table-cell order-total"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Total Amount: "), "$" + order.TotalAmount));
}; //When you click on an order, these are used:
//need to seperate these based on the id they were clicked on


var DetailedListFull = function DetailedListFull(props) {
  //let detail = props.orderItems;
  var order = props.orderItems[0];
  var activeDate = "NA";

  if (order.Order.ActivatedDate) {
    activeDate = order.Order.ActivatedDate.split('T')[0];
  }

  var accountName = "NA";

  if (order.Order.Account) {
    accountName = order.Order.Account.Name;
  }

  var shippingName = "NA";

  if (order.Order.ShipToContact) {
    shippingName = order.Order.ShipToContact.Name;
  }

  var billingName = "NA";

  if (order.Order.BillToContact) {
    billingName = order.Order.BillToContact.Name;
  } //Order.EffectiveDate, activeDate, accountName, billingName, shippingName, Order.TotalAmount, Order.OrderNumber


  return vNode("div", null, vNode("div", null, vNode("h1", {
    "class": "margin-maker-2"
  }, "Order ", order.Order.OrderNumber), vNode("h2", {
    "class": "margin-maker"
  }, accountName), vNode("h3", null, shippingName), vNode("h4", null, "Active Date: ", activeDate), vNode("h4", null, "Effective Date: ", order.Order.EffectiveDate), vNode("h4", null, "Total Amount: ", order.Order.TotalAmount), vNode("br", null), vNode(OrderItemsList, {
    orderItems: props.orderItems
  })));
};

var OrderItemsList = function OrderItemsList(props) {
  var orderItems = props.orderItems;
  var orderItemsFormatted = [];

  for (var i = 0; i < orderItems.length; i++) {
    orderItemsFormatted.push(vNode(OrderItemListItem, {
      orderItem: orderItems[i]
    }));
  }

  return vNode("div", {
    "class": "flex-parent contact-list",
    id: "contactList3"
  }, vNode("ul", {
    "class": "table-row should-be-invisible table-headers"
  }, vNode("li", {
    "class": "table-cell"
  }, "Product"), vNode("li", {
    "class": "table-cell"
  }, "Account"), vNode("li", {
    "class": "table-cell"
  }, "Name"), vNode("li", {
    "class": "table-cell"
  }, "Expiration Date"), vNode("li", {
    "class": "table-cell"
  }, "Unit Price"), vNode("li", {
    "class": "table-cell"
  }, "Quantity"), vNode("li", {
    "class": "table-cell"
  }, "Total Amount")), orderItemsFormatted);
};

var OrderItemListItem = function OrderItemListItem(props) {
  var orderItem = props.orderItem;
  var productName = "NA";
  var productLinkId = "";

  if (orderItem.Product2) {
    productName = orderItem.Product2.Name;

    if (orderItem.Product2.ClickpdxCatalog__IsOption__c) {
      productLinkId = orderItem.Product2.ClickpdxCatalog__ParentProduct__c;
    } else {
      productLinkId = orderItem.Product2Id;
    }
  }

  var accountName = "NA";

  if (orderItem.Contact__r) {
    if (orderItem.Contact__r.Account) {
      accountName = orderItem.Contact__r.Account.Name;
    }
  }

  var fullName = "NA";

  if (orderItem.FirstName__c && orderItem.LastName__c) {
    fullName = orderItem.FirstName__c + " " + orderItem.LastName__c;
  }

  var totalPrice = "NA";

  if (orderItem.TotalPrice) {
    totalPrice = orderItem.TotalPrice;
  } else if (orderItem.UnitPrice && orderItem.Quantity) {
    totalPrice = orderItem.UnitPrice + orderItem.Quantity;
  } //will need something to check if product doesnt exist dont put it as link


  return vNode("ul", {
    "class": "table-row"
  }, vNode("li", {
    "class": "table-cell order-bill"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Product: "), vNode("a", {
    target: "_blank",
    href: "https://ocdpartial-ocdla.cs198.force.com/OcdlaProduct?id=" + productLinkId
  }, productName)), vNode("li", {
    "class": "table-cell account-id"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Account: "), accountName), vNode("li", {
    "class": "table-cell account-id"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Name: "), fullName), vNode("li", {
    "class": "table-cell account-id"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Expiration Date: "), orderItem.ExpirationDate__c), vNode("li", {
    "class": "table-cell order-total"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Unit Price: "), "$" + orderItem.UnitPrice), vNode("li", {
    "class": "table-cell account-id"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Quantity: "), orderItem.Quantity), vNode("li", {
    "class": "table-cell order-total"
  }, vNode("span", {
    className: "disappear-when-big"
  }, "Total Amount: "), "$" + totalPrice));
};