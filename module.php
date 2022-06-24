<?php 




class ExampleModule extends Module {

    public function __construct(){
        parent::__construct();

        $this->name = "example";
    }





    public function theCallback() {
		$tpl = new Template("default");
		$tpl->addPath(__DIR__ . "/templates");

		$html = $tpl;

		return $tpl;
    }



    public function getJsonList() {
		$api = $this->loadForceApi();

		$results = $api->query("SELECT OrderItem.Contact__c, OrderItem.Product2Id, Contact__r.AccountId, Contact__r.Name, OrderItem.OrderId, OrderItem.ExpirationDate__c, OrderItem.UnitPrice, OrderItem.Quantity, OrderItem.TotalPrice, Order.DateOrderConfirmed__c, Order.OrderNumber FROM OrderItem LIMIT 100");

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


}

