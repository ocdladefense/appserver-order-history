/** @jsx vNode */

//import { OrderList } from './components.js';
import { vNode, View } from '/node_modules/@ocdladefense/view/view.js';

class OrderHistory extends View {

    render(props) {

        let theList = getOrderItems();
        window.view = view;
        Promise.all([theList]).then(function(data) {

    
        let fn = function(e) {
            e.recordId = e.currentTarget.dataset && e.currentTarget.dataset.recordId;
            e.frameworkDetail = e.currentTarget.dataset;
            e.action = e.currentTarget.dataset.action;
            console.log(e.recordId);
        };



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
                <h2>Order History for {billingName}</h2>


                let orders = props.orders;

                let ordersFormatted = [];
                for (let i = 0; i < orders.length; i++) {
                    let isEven = i % 2 == 0;
                    ordersFormatted.push(<OrderListItem order={orders[i]} even={isEven} />);
                }

                return (
                <table class="flex-parent order-list">
                    <tr class="tr-table-row should-be-invisible table-headers">
                        <td class="td-table-cell">Order #:</td>
                        <td class="td-table-cell">Date Ordered:</td>
                        <td class="td-table-cell">Account:</td>
                        <td class="td-table-cell">Bill To:</td>
                        <td class="td-table-cell">Ship To:</td>
                        <td class="td-table-cell">Total:</td>
                    </tr>
                    {ordersFormatted}
                </table>
                )

            </div>
        )
        });
    
    }

    


    
    loadOrder(e) {
        console.log(e.target);
        let theList = getOrderItemDetails(e.target.dataset.orderId);
        Promise.all([theList]).then(function(data) {
            
            
            let initTree = <DetailedListFull orderItems={data[0]} />;
    
            this.update(initTree);
        });
    
        //return initTree;
    }

    getOrderItems() {
        return fetch("/orderhistory/list/json")
        .then(resp => resp.json())
        .then(data => {return data;});
    }
    
    getOrderItemDetails(queryId) {
        //8010a00000GBItsAAH
        return fetch("/orderhistory/details/json/" + queryId)
        .then(resp => resp.json())
        .then(data => {return data;});
    }
    


}