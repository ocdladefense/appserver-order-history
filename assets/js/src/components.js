/** @jsx vNode */


/**

This is our list of components to be used in the app.

**/



export { OrderListFull, OrderList, DetailedListFull, getOrderItems, getOrderItemDetails };




import { vNode } from '../../../node_modules/@ocdladefense/view/view.js';

import { CACHE, HISTORY } from '../../../node_modules/@ocdladefense/view/cache.js';

import { dateFormat, moneyFormat } from './format.js';



//for the list of orders these are used



const Order = function(props) {
    let order = props.order;
    let isEven = props.even;

    let date = "NA";
    if (order.EffectiveDate) {
        date = dateFormat(order.EffectiveDate);
    }
    let accountName = "NA";
    if (order.Account) {
        accountName = order.Account.Name;
    }
    let shippingName = "NA";
    let orderShippingNode = <p>NA</p>
    if (order.ShipToContact) {
        shippingName = order.ShipToContact.Name;
        orderShippingNode = <a target="_blank" href={"/directory/members/"+order.ShipToContactId}>{shippingName}</a>
    }
    let billingName = "NA";
    let orderBillingNode = <p>NA</p>
    if (order.BillToContact) {
        billingName = order.BillToContact.Name;
        orderBillingNode = <a target="_blank" href={"/directory/members/"+order.BillToContactId}>{billingName}</a>
    }

    let fn = function(e) {
        e.recordId = e.currentTarget.dataset && e.currentTarget.dataset.recordId;
        e.frameworkDetail = e.currentTarget.dataset;
        e.action = e.currentTarget.dataset.action;
        console.log(e.recordId);
    };

    function loadOrder(e) {
        console.log(e.target);
        let theList = getOrderItemDetails(e.target.dataset.orderId);
        Promise.all([theList]).then(function(data) {
            
            
            let initTree = <DetailedListFull orderItems={data[0]} />;
    
            view.update(initTree);
        });
    
        //return initTree;
    }
    

    //TODO: Links are clickable even if they are NA href={"/orderhistory/details/"+order.Id}  target="_blank"
    return (
      <tr class={isEven ? "order tr-table-row" : "order tr-table-row orderedItemGrey"} data-record-id={order.Id}>
        <td class="td-table-cell order-number">
            <span className="disappear-when-big">Order #: </span>
            <a class="testEventClass" href="#" data-action="loadOrder" data-record-id={order.Id} onclick={loadOrder}>{order.OrderNumber}</a>
        </td>
        <td class="td-table-cell order-effective"><span className="disappear-when-big">Date Ordered: </span>{date}</td>
        <td class="td-table-cell account-id"><span className="disappear-when-big">Account: </span>{accountName}</td>
        <td class="td-table-cell order-bill"><span className="disappear-when-big">Bill To: </span>{orderBillingNode}</td>
        <td class="td-table-cell order-ship"><span className="disappear-when-big">Ship To: </span>{orderShippingNode}</td>
        <td class="td-table-cell order-total"><span className="disappear-when-big">Total Amount: </span>{moneyFormat(order.TotalAmount)}</td>
      </tr>
    )

};



//When you click on an order, these are used:
//need to seperate these based on the id they were clicked on



const OrderDetails = function(props){
    //let detail = props.orderItems;
    let order = props.orderItems[0];

    let activeDate = "No Date"; //this isnt getting used
    if (order.Order.ActivatedDate) {
        activeDate = order.Order.ActivatedDate.split('T')[0];
    }
    let accountName = "No Account Connected";
    if (order.Order.Account) {
        accountName = order.Order.Account.Name;
    }
    let shippingName = "No Shipping Name";
    if (order.Order.ShipToContact) {
        shippingName = order.Order.ShipToContact.Name;
    }
    let billingName = "No Billing Name";
    if (order.Order.BillToContact) {
        billingName = order.Order.BillToContact.Name;
    }
//Order.EffectiveDate, activeDate, accountName, billingName, shippingName, Order.TotalAmount, Order.OrderNumber

    return(
        <div>
            <div>
                <a class="return-link" href="/orderhistory/list">Return to Order List</a>
                <div class="title-container">
                    <div class="title-left">
                        <h2 class="margin-maker-2">
                            Order #{order.Order.OrderNumber}
                        </h2>
                        <h2 class="margin-maker">
                            {accountName}
                        </h2>
                        <h2>Date: {dateFormat(order.Order.EffectiveDate)}</h2>
                        
                    </div>
                    <div class="title-right">
                        <h2>Total Amount: {moneyFormat(order.Order.TotalAmount)}</h2>
                        <h2>Billing Name: {billingName}</h2>
                        <h2>Shipping Name: {shippingName}</h2>
                    </div>
                </div>
                <OrderItemsList orderItems={props.orderItems} />
            </div>
            
        </div>
        
    )
}

const OrderItemList = function(props) {

    let orderItems = props.orderItems;
  
    let orderItemsFormatted = [];
    for (let i = 0; i < orderItems.length; i++) {
        let isEven = i % 2 == 0;
        orderItemsFormatted.push(<OrderItemListItem orderItem={orderItems[i]} even={isEven} />);
    }
  
    return (
      <table class="flex-parent contact-list" id="contactList3">
        <tr class="tr-table-row should-be-invisible table-headers">
          <td class="td-table-cell">Product</td>
          <td class="td-table-cell">Name</td>
          <td class="td-table-cell">Expiration Date</td> 
          <td class="td-table-cell">Unit Price</td>
          <td class="td-table-cell">Quantity</td>
          <td class="td-table-cell">Total Amount</td>
        </tr>
        {orderItemsFormatted}
      </table>
    )
};

const OrderItem = function(props) {

    let orderItem = props.orderItem;
    let isEven = props.even;

    let productName = "NA";
    let productLinkId = "";
    if (orderItem.Product2) {
        //OrderItem.Product2.IsActive
        productName = orderItem.Product2.Name;
        if (orderItem.Product2.IsActive) {
            if (orderItem.Product2.ClickpdxCatalog__IsOption__c) {
                let productLinkUrl = "https://ocdpartial-ocdla.cs198.force.com/OcdlaProduct?id=" + orderItem.Product2.ClickpdxCatalog__ParentProduct__c;
                productLinkId = <a target="_blank" href={productLinkUrl}>{productName}</a>
            }
            else {
                let productLinkUrl = "https://ocdpartial-ocdla.cs198.force.com/OcdlaProduct?id=" + orderItem.Product2Id;
                productLinkId = <a target="_blank" href={productLinkUrl}>{productName}</a>
            }
        }
        else {
            productLinkId = <div>{productName}</div>;
        }
    }
    else {
        productLinkId = <div>{productName}</div>;
    }
    let fullName = "NA";
    if (orderItem.FirstName__c && orderItem.LastName__c) {
        fullName = orderItem.FirstName__c + " " + orderItem.LastName__c;
    }
    let totalPrice = "NA";
    if (orderItem.TotalPrice) {
        totalPrice = orderItem.TotalPrice;
    }
    
    
    //will need something to check if product doesnt exist dont put it as link
    return (
      <tr class={isEven ? "tr-table-row" : "tr-table-row orderedItemGrey"}>
        <td class="td-table-cell order-bill"><span className="disappear-when-big">Product: </span>{productLinkId}</td>
        <td class="td-table-cell account-id"><span className="disappear-when-big">Name: </span>{fullName}</td>
        <td class="td-table-cell account-id"><span className="disappear-when-big">Expiration Date: </span>{dateFormat(orderItem.ExpirationDate__c)}</td>
        <td class="td-table-cell order-total"><span className="disappear-when-big">Unit Price: </span>{moneyFormat(orderItem.UnitPrice)}</td>
        <td class="td-table-cell account-id"><span className="disappear-when-big">Quantity: </span>{orderItem.Quantity.toString()}</td>
        <td class="td-table-cell order-total"><span className="disappear-when-big">Total Amount: </span>{moneyFormat(totalPrice)}</td>
      </tr>
    )

};



//data.js
function getOrderItems() {
    return fetch("/orderhistory/list/json")
    .then(resp => resp.json())
    .then(data => {return data;});
}

function getOrderItemDetails(queryId) {
    //8010a00000GBItsAAH
    return fetch("/orderhistory/details/json/" + queryId)
    .then(resp => resp.json())
    .then(data => {return data;});
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


