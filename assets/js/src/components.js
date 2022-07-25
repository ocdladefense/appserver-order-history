/** @jsx vNode */


/**

This is our list of components to be used in the app.

**/



export { OrderListFull, OrderList, DetailedListFull };


import { vNode } from '../../../node_modules/@ocdladefense/view/view.js';

import { CACHE, HISTORY } from '../../../node_modules/@ocdladefense/view/cache.js';

import { cityFormatter, stateFormatter, createMemberX } from './contactFieldFormat.js';



//for the list of orders these are used

const OrderListFull = function(props) {

    if (props.orders.length <= 0) {
        return(<div><h2>No Orders Found for this Account</h2></div>);
    }

    let orders = props.orders[0];
    let billingName = "";
    if (orders.BillToContact) {
        billingName = orders.BillToContact.Name;
    }
    
    return(
        <div>
            <div>
                <h2>Order History for {billingName}</h2>
            </div>
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
          <li class="table-cell">Order Number</li>
          <li class="table-cell">Account</li>
          <li class="table-cell">Activated Date</li>
          <li class="table-cell">Effective Date</li>
          <li class="table-cell">Ship To Contact</li>
          <li class="table-cell">Bill To Contact</li>
          <li class="table-cell">Total Amount</li>
        </ul>
        {ordersFormatted}
      </div>
    )
};

const OrderListItem = function(props) {

    let order = props.order;
    let activeDate = "NA";
    if (order.ActivatedDate) {
        activeDate = order.ActivatedDate.split('T')[0];
    }
    let accountName = "NA";
    if (order.Account) {
        accountName = order.Account.Name;
    }
    let shippingName = "NA";
    if (order.ShipToContact) {
        shippingName = order.ShipToContact.Name;
    }
    let billingName = "NA";
    if (order.BillToContact) {
        billingName = order.BillToContact.Name;
    }

    //TODO: Links are clickable even if they are NA
    return (
      <ul class="table-row">
        <li class="table-cell order-number"><span className="disappear-when-big">Order Number: </span><a target="_blank" href={"/orderhistory/details/"+order.Id}>{order.OrderNumber}</a></li>
        <li class="table-cell account-id"><span className="disappear-when-big">Account: </span>{accountName}</li>
        <li class="table-cell order-activate"><span className="disappear-when-big">Activated Date: </span>{activeDate}</li>
        <li class="table-cell order-effective"><span className="disappear-when-big">Effective Date: </span>{order.EffectiveDate}</li>
        <li class="table-cell order-ship"><span className="disappear-when-big">Ship To Contact: </span><a target="_blank" href={"/directory/members/"+order.ShipToContactId}>{shippingName}</a></li>
        <li class="table-cell order-bill"><span className="disappear-when-big">Bill To Contact: </span><a target="_blank" href={"/directory/members/"+order.BillToContactId}>{billingName}</a></li>
        <li class="table-cell order-total"><span className="disappear-when-big">Total Amount: </span>{"$"+order.TotalAmount}</li>
      </ul>
    )

};



//When you click on an order, these are used:
//need to seperate these based on the id they were clicked on



const DetailedListFull = function(props){
    //let detail = props.orderItems;
    let order = props.orderItems[0];

    let activeDate = "NA";
    if (order.Order.ActivatedDate) {
        activeDate = order.Order.ActivatedDate.split('T')[0];
    }
    let accountName = "NA";
    if (order.Order.Account) {
        accountName = order.Order.Account.Name;
    }
    let shippingName = "NA";
    if (order.Order.ShipToContact) {
        shippingName = order.Order.ShipToContact.Name;
    }
    let billingName = "NA";
    if (order.Order.BillToContact) {
        billingName = order.Order.BillToContact.Name;
    }
//Order.EffectiveDate, activeDate, accountName, billingName, shippingName, Order.TotalAmount, Order.OrderNumber
    return(
        <div>
            <div>
                <h1 class="margin-maker-2">
                    Order {order.Order.OrderNumber}
                </h1>
                <h2 class="margin-maker">
                    {accountName}
                </h2>
                <h3>{shippingName}</h3>
                <h4>Active Date: {activeDate}</h4>
                <h4>Effective Date: {order.Order.EffectiveDate}</h4>
                <h4>Total Amount: {order.Order.TotalAmount}</h4>
                <br />
                <OrderItemsList orderItems={props.orderItems} />
            </div>
            
        </div>
        
    )
}

const OrderItemsList = function(props) {

    let orderItems = props.orderItems;
  
    let orderItemsFormatted = [];
    for (let i = 0; i < orderItems.length; i++) {
        orderItemsFormatted.push(<OrderItemListItem orderItem={orderItems[i]} />);
    }
  
    return (
      <div class="flex-parent contact-list" id="contactList3">
        <ul class="table-row should-be-invisible table-headers">
          <li class="table-cell">Product</li>
          <li class="table-cell">Account</li>
          <li class="table-cell">Name</li>
          <li class="table-cell">Expiration Date</li> 
          <li class="table-cell">Unit Price</li>
          <li class="table-cell">Quantity</li>
          <li class="table-cell">Total Amount</li>
        </ul>
        {orderItemsFormatted}
      </div>
    )
};

const OrderItemListItem = function(props) {

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
      <ul class="table-row">
        <li class="table-cell order-bill"><span className="disappear-when-big">Product: </span><a target="_blank" href={"https://ocdpartial-ocdla.cs198.force.com/OcdlaProduct?id="+productLinkId}>{productName}</a></li>
        <li class="table-cell account-id"><span className="disappear-when-big">Account: </span>{accountName}</li>
        <li class="table-cell account-id"><span className="disappear-when-big">Name: </span>{fullName}</li>
        <li class="table-cell account-id"><span className="disappear-when-big">Expiration Date: </span>{orderItem.ExpirationDate__c}</li>
        <li class="table-cell order-total"><span className="disappear-when-big">Unit Price: </span>{"$"+orderItem.UnitPrice}</li>
        <li class="table-cell account-id"><span className="disappear-when-big">Quantity: </span>{orderItem.Quantity}</li>
        <li class="table-cell order-total"><span className="disappear-when-big">Total Amount: </span>{"$"+totalPrice}</li>
      </ul>
    )

};

