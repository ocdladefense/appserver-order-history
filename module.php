<?php 




class OrderHistoryModule extends Module {

    public function __construct(){
        parent::__construct();

        $this->name = "orderHistory";
    }





    public function theCallback() {
		$tpl = new Template("default");
		$tpl->addPath(__DIR__ . "/templates");

		$html = $tpl;

		return $tpl;
    }



    public function getJsonList() {
		$api = $this->loadForceApi();
		
		$currentUserId = '003j000000rU9NvAAK';


		$user = current_user();

		$contactId = $user->getContactId();
		// 003j000000rU9NvAAK

		$query = "SELECT Id, orderNumber, EffectiveDate, ActivatedDate, AccountId, BillToContactId, ShipToContactId, ShipToContact.Name, BillToContact.Name, Account.Name, TotalAmount FROM ORDER WHERE BillToContactId = '%s' ORDER BY EffectiveDate DESC LIMIT 100";
		$query = sprintf($query, $contactId);

		$results = $api->query($query);

		$records = $results->getRecords();
	
		return $records;
    }




	public function getOrderDetailsJson($id){

		
		$api = $this->loadForceApi();

		$results = $api->query("SELECT OrderItem.Contact__c, OrderItem.Product2Id, OrderItem.Product2.IsActive, OrderItem.Product2.ClickpdxCatalog__IsOption__c, OrderItem.Product2.ClickpdxCatalog__ParentProduct__c, OrderItem.Product2.Name, Contact__r.AccountId, Contact__r.Account.Name, Contact__r.Name, OrderItem.FirstName__c, OrderItem.LastName__c, OrderItem.ExpirationDate__c, OrderItem.OrderId, OrderItem.UnitPrice, OrderItem.Quantity, OrderItem.TotalPrice, Order.EffectiveDate, Order.ActivatedDate, Order.Account.Name, Order.BillToContact.Name, Order.ShipToContact.Name, Order.TotalAmount, Order.OrderNumber FROM OrderItem WHERE OrderId = '$id' ORDER BY ExpirationDate__c DESC");

		$records = $results->getRecords();

		return $records;
	}



	public function getDetailsList($id){

		$tpl = new Template("detailed");
		$tpl->addPath(__DIR__ . "/templates");

		$widgetHTML = $tpl->render(array(
			"orderId"     => $id
		  ));

		return $widgetHTML;
	}



}

