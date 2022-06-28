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
            <OrderList orders={props.orders} />
        </div>
    )
};

const OrderList = function(props) {

    let orders = props.orders;
  
    let ordersFormatted = [];
    for (let i = 0; i < orders.length; i++) {
        ordersFormatted.push(<OrderListItem order={orders[i]} />);
    }
  
    return (
      <div class="flex-parent contact-list" id="contactList3">
        <ul class="table-row should-be-invisible table-headers">
          <li class="table-cell">OrderNumber</li>
          <li class="table-cell">AccountId</li>
          <li class="table-cell">ActivatedDate</li>
          <li class="table-cell">EffectiveDate</li>
          <li class="table-cell">BillToContact</li>
          <li class="table-cell">ShipToContact</li>
          <li class="table-cell">TotalAmount</li>
        </ul>
        {ordersFormatted}
      </div>
    )
};

const OrderListItem = function(props) {

    let order = props.order;
  
    return (
      <ul class="table-row">
        <li class="table-cell order-number"><a href={"/orderhistory/details/"+order.Id}>{order.OrderNumber}</a></li>
        <li class="table-cell account-id"><a href={"/directory/members/"+order.AccountId}>{order.Account.Name}</a></li>
        <li class="table-cell order-activate">{order.ActivatedDate}</li>
        <li class="table-cell order-effective">{order.EffectiveDate}</li>
        <li class="table-cell order-ship"><a href={"/directory/members/"+order.ShipToContactId}>{order.ShipToContactId}</a></li>
        <li class="table-cell order-bill"><a href={"/directory/members/"+order.BillToContactId}>{order.BillToContact.Name}</a></li>
        <li class="table-cell order-total">{order.TotalAmount}</li>
      </ul>
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
