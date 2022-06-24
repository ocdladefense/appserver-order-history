/** @jsx vNode */


/**

This is our list of components to be used in the app.

**/



export { OrderListFull, OrderFull, OrderList };


import { vNode } from '../../../node_modules/@ocdladefense/view/view.js';

import { CACHE, HISTORY } from '../../../node_modules/@ocdladefense/view/cache.js';

import { cityFormatter, stateFormatter, createMemberX } from './contactFieldFormat.js';



//for the list of orders these are used

const OrderListFull = function(props) {
    return(
        <div> 
            <OrderList orderItems={props.orderItems} />
        </div>
    )
};

const OrderList = function(props) {
    let orderItems = props.orderItems;

    let list = [];
    for (let i = 0; i < orderItems.length; i++) {
        list.push(<OrderListItem orderItem={orderItems[i]} />); //here might be a good place to add them together?
    }

    return (
        <div class="flex-parent record-list" id="record-list-3">
            {list}
        </div>
    )
};

const OrderListItem = function(props) {
    
    // let theCount = parseInt(CACHE.get("eventsContactCount")[props.event.Id] && CACHE.get("eventsContactCount")[props.event.Id].expr0).toString();
    // theCount = CACHE.get("eventsContactCount")[props.event.Id] ? theCount : "None";
    let theCount = "5";

    // href={"#" + props.event.Id}
    let contactName = "NA";
    let orderNumber = "NA";
    if (props.orderItem.Contact__r) {
        contactName = props.orderItem.Contact__r.Name
    }
    if (props.orderItem.Order) {
        orderNumber = props.orderItem.Order.OrderNumber
    }
    
    return (
        <div class="record-list-item">
            <h3><a class="record-button record-button-2" data-action="details" href={"#"} data-event-id={orderNumber}>{orderNumber}</a></h3>
            <p>{props.orderItem.TotalPrice}</p>
            <p>{props.orderItem.ExpirationDate__c}</p>
            <p>{contactName}</p>
        </div>
    )
};


//When you click on an order, these are used:
//need to seperate these based on the id they were clicked on

const OrderFull = function(props) {
    
    return(
        <div>
            <OrderDetails orderItems={props.orderItems} />
        </div>
    )
};

const OrderDetails = function(props) {
    let orderItems = props.orderItems;

    return (
        <div>
            <h1 class="margin-maker-2">
                {orderItems.Name}
            </h1>
            <h3 class="margin-maker">
                {orderItems.Start_Date__c}
            </h3>
            <a href={"https://ocdla.force.com/OcdlaEvent?id=" + orderItems.Id} target="_blank" class="margin-maker">
                Link to the event page in more detail.
            </a>
        </div>
    )
};
