/** @jsx vNode */

/**

This is our list of components to be used in the app.

**/
export { OrderListFull, OrderFull, OrderList };
import { vNode } from '../../../node_modules/@ocdladefense/view/view.js';
import { CACHE, HISTORY } from '../../../node_modules/@ocdladefense/view/cache.js';
import { cityFormatter, stateFormatter, createMemberX } from './contactFieldFormat.js'; //for the list of orders these are used

var OrderListFull = function OrderListFull(props) {
  return vNode("div", null, vNode(OrderList, {
    orderItems: props.orderItems
  }));
};

var OrderList = function OrderList(props) {
  var orderItems = props.orderItems;
  var list = [];

  for (var i = 0; i < orderItems.length; i++) {
    list.push(vNode(OrderListItem, {
      orderItem: orderItems[i]
    })); //here might be a good place to add them together?
  }

  return vNode("div", {
    "class": "flex-parent record-list",
    id: "record-list-3"
  }, list);
};

var OrderListItem = function OrderListItem(props) {
  // let theCount = parseInt(CACHE.get("eventsContactCount")[props.event.Id] && CACHE.get("eventsContactCount")[props.event.Id].expr0).toString();
  // theCount = CACHE.get("eventsContactCount")[props.event.Id] ? theCount : "None";
  var theCount = "5"; // href={"#" + props.event.Id}

  var contactName = "NA";
  var orderNumber = "NA";

  if (props.orderItem.Contact__r) {
    contactName = props.orderItem.Contact__r.Name;
  }

  if (props.orderItem.Order) {
    orderNumber = props.orderItem.Order.OrderNumber;
  }

  return vNode("div", {
    "class": "record-list-item"
  }, vNode("h3", null, vNode("a", {
    "class": "record-button record-button-2",
    "data-action": "details",
    href: "#",
    "data-event-id": orderNumber
  }, orderNumber)), vNode("p", null, props.orderItem.TotalPrice), vNode("p", null, props.orderItem.ExpirationDate__c), vNode("p", null, contactName));
}; //When you click on an order, these are used:
//need to seperate these based on the id they were clicked on


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