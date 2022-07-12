/** @jsx vNode */

/**

This is our list of components to be used in the app.

**/
export { OrderListFull, OrderFull, OrderList, DetailedListFull };
import { vNode } from '../../../node_modules/@ocdladefense/view/view.js';
import { CACHE, HISTORY } from '../../../node_modules/@ocdladefense/view/cache.js';
import { cityFormatter, stateFormatter, createMemberX } from './contactFieldFormat.js'; //for the list of orders these are used

var OrderListFull = function OrderListFull(props) {
  return vNode("div", null, vNode(OrderList, {
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
  var activeDate = "";

  if (order.ActivatedDate) {
    activeDate = order.ActivatedDate.split('T')[0];
  }

  var accountName = "";

  if (order.Account) {
    accountName = order.Account.Name;
  }

  var shippingName = "";

  if (order.ShipToContact) {
    shippingName = order.ShipToContact.Name;
  }

  var billingName = "";

  if (order.BillToContact) {
    billingName = order.BillToContact.Name;
  }

  return vNode("ul", {
    "class": "table-row"
  }, vNode("li", {
    "class": "table-cell order-number"
  }, vNode("a", {
    target: "_blank",
    href: "/orderhistory/details/" + order.Id
  }, order.OrderNumber)), vNode("li", {
    "class": "table-cell account-id"
  }, accountName), vNode("li", {
    "class": "table-cell order-activate"
  }, activeDate), vNode("li", {
    "class": "table-cell order-effective"
  }, order.EffectiveDate), vNode("li", {
    "class": "table-cell order-ship"
  }, vNode("a", {
    target: "_blank",
    href: "/directory/members/" + order.ShipToContactId
  }, shippingName)), vNode("li", {
    "class": "table-cell order-bill"
  }, vNode("a", {
    target: "_blank",
    href: "/directory/members/" + order.BillToContactId
  }, billingName)), vNode("li", {
    "class": "table-cell order-total"
  }, "$" + order.TotalAmount));
}; //When you click on an order, these are used:
//need to seperate these based on the id they were clicked on


var DetailedListFull = function DetailedListFull(props) {
  //let detail = props.orderItems;
  console.log(props.orderItems);
  return vNode("div", null, vNode("p", null, "heloo there"));
};

var OrderFull = function OrderFull(props) {
  return vNode("div", null, vNode(OrderDetails, {
    orderItems: props.orderItems
  }));
};

var OrderDetails = function OrderDetails(props) {
  var orderItems = props.orderItems;
  return vNode("div", null, vNode("h1", {
    "class": "margin-maker-2"
  }, orderItems.Name), vNode("h3", {
    "class": "margin-maker"
  }, orderItems.Start_Date__c), vNode("a", {
    href: "https://ocdla.force.com/OcdlaEvent?id=" + orderItems.Id,
    target: "_blank",
    "class": "margin-maker"
  }, "Link to the event page in more detail."));
};