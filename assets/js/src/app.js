/** @jsx vNode */

import { vNode, addEvent, getMainContainer, changeMainContainer, myAppEventHandler, render } from '../../../node_modules/@ocdladefense/view/view.js';

import { CACHE, HISTORY } from '../../../node_modules/@ocdladefense/view/cache.js';



import { getOrderItems, getOrderItemDetails } from './data.js';

import { OrderListFull, OrderFull } from './components.js';

import { switchToList, switchToDetails, doSearch } from './events.js';



function init() {
    // Probably change to document.querySelector().
    changeMainContainer("order-history-main");

    let theList = getOrderItems();


    Promise.all([theList]).then(function(data) {
        CACHE.set("OrderItems", data[0]); //not being used? maybe?
        
        let initTree = <OrderListFull orderItems={data[0]} />;
        
        HISTORY.clear();
        HISTORY.set(0, initTree);
        console.log(getMainContainer());
        render(getMainContainer(), initTree);
    });

    document.addEventListener("click", myAppEventHandler);
}
/*
addEvent("search", function() {
    let stringEntered = document.getElementById("searchBar").value;
    let orderDatesAcs = document.getElementById("dateCheckBox").checked;
    let orderAttendeesDesc = document.getElementById("contactsChecked").checked;

    return doSearch(stringEntered, orderDatesAcs, orderAttendeesDesc);
});
addEvent("list", switchToList);
addEvent("details", switchToDetails);
*/

domReady(init);