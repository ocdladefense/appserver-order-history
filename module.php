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


		$user = current_user();

		$contactId = $user->getContactId();
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



	public function getOrderDetailsJson($id){
		$api = $this->loadForceApi();

		$results = $api->query("SELECT OrderItem.OcdlaProductName__c, OrderItem.Quantity, OrderItem.UnitPrice From OrderItem Where OrderItem.OrderId = '$id'");

		$records = $results->getRecords();

		return $records;
	}

	public function getDetailsList($id){

		$orderId = $id;

		$tpl = new Template("detailed");
		$tpl->addPath(__DIR__ . "/templates");

		$html = $tpl;

		return $tpl;
	}



}

