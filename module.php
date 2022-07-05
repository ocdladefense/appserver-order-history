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
		//var_dump(current_user());
		//exit;
		$currentUserId = '003j000000rU9NvAAK';

		$results = $api->query("SELECT Id, orderNumber, EffectiveDate, ActivatedDate, AccountId, BillToContactId, ShipToContactId, ShipToContact.Name, BillToContact.Name, Account.Name, TotalAmount FROM ORDER WHERE BillToContactId = '003j000000rU9NvAAK' LIMIT 100");

		$records = $results->getRecords();
	
		return $records;
    }




	public function getJsonDetails($id) {
		//This isnt getting used with the above query, but above query uses extra js work rather than another call to db
		$api = $this->loadForceApi();

		$results = $api->query("SELECT Name, Id, Start_date__c FROM Event__c WHERE Id = '$id'");

		$records = $results->getRecords();
	
		return $records[0];
	}



	public function getOrderDetails($id){
		$api = $this->loadForceApi();

		$results = $api->query("SELECT OrderItem.OcdlaProductName__c, OrderItem.Quantity, OrderItem.UnitPrice From OrderItem Where OrderItem.OrderId = '$id'");

		$records = $results->getRecords();

		return $records;
	}



}

