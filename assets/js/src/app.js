/** @jsx vNode */

import { vNode, View } from '/node_modules/@ocdladefense/view/view.js'; //point to root js file

import { OrderHistory } from './OrderHistory.js';



function init() {
    // Probably change to document.querySelector().
    //changeMainContainer("order-history-main");

    
    let view = View.createRoot("#order-history-main");
    view.render(<OrderHistory />);

    

    //view.addEvent("loadOrder", loadOrder);
}



//document.addEventListener("click", myAppEventHandler);
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