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

		$contactId = $currentUserId;//$user->getContactId();
		// 003j000000rU9NvAAK

		$query = "SELECT Id, orderNumber, EffectiveDate, ActivatedDate, AccountId, BillToContactId, ShipToContactId, ShipToContact.Name, BillToContact.Name, Account.Name, TotalAmount FROM ORDER WHERE BillToContactId = '%s' LIMIT 100";
		$query = sprintf($query, $contactId);

		$results = $api->query($query);

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


	public function getOrderItems($Id) {
		$api = $this->loadForceApi();//here for example, remove later on

		$results = $api->query("SELECT Id, Product2Id, Note_1__c, Note_2__c, Note_3__c, FirstName__c, LastName__c, ExpirationDate__c, Product2.Name, UnitPrice, Quantity, TotalPrice FROM OrderItem WHERE OrderId = '$Id' Order By ExpirationDate__c DESC");

		$records = $results->getRecords();
	
		return $records;
	}

	public function getOrderDetailsJson($id){

		return "dlfskdlf";
		/*
		$api = $this->loadForceApi();

		$results = $api->query("Select Id From Order Where Id = '$id'");

		$records = $results->getRecords();

		return $records;*/
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

