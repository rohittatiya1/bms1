mainApp.controller('CustomerDetailController',function($scope,$location){
  $scope.goBackOnHome = function(){
      
      $location.path('/');
 }
  
  // getting order_id,total,servicetax from category popup controller
  $scope.order_id=sessionStorage.getItem("order_id");
  $scope.total=sessionStorage.getItem("total_amount");
  $scope.service_charge=sessionStorage.getItem("servicecharge");
    
    // getting seat_cat_id from seat category controller
    
    $scope.seat_cat_tax=sessionStorage.getItem("seat_cat_id");
    
    // totalamount including service tax
    
    $scope.amount=parseInt($scope.total)+parseInt($scope.service_charge);
    
 $scope.custvalidation=function(customer){
	 
	 var firstname=document.getElementById("firstname").value;
	 var patt=/^[a-zA-Z ]/;
     if(firstname==""){
         document.getElementById("fname").innerHTML="Please Enter your name";
     }
	else if(patt.test(firstname))
	 {
	   
     }	 
     else{
         document.getElementById("fname").innerHTML="Please Enter Character Only";
	  
     }
     
	 var lastname=document.getElementById("lastname").value;
	 var patt=/^[a-zA-Z ]/;
     if(lastname==""){
         document.getElementById("lname").innerHTML="Please Enter your last name";
     }
	else if(patt.test(lastname))
	 {
	   
		  
     }	
     else{
         document.getElementById("lname").innerHTML="Please Enter Character Only";
     }
     
	 var email=document.getElementById("email").value;
	 var pattern=/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
	 if(email==""){
          document.getElementById("mail").innerHTML="Please Enter Your Email ID";
     }
     else if(pattern.test(email))
	 {   
		 
	    
		
     }
     else{
         document.getElementById("mail").innerHTML="Invalid Email Id";
     }
	  var mob=document.getElementById("mob").value;
	 var patt=/^\d{10}$/;
     if(mob==""){
         document.getElementById("number").innerHTML="Please Enter Your Mobile No";
	    
     }
	 else if(patt.test(mob))
	 {
	   
		 
    }
     else{
         document.getElementById("number").innerHTML="Enter 10 Digit Mobile number Only";
	    
     }
 
 
	
	 var address=document.getElementById("address").value;
	 var patt=/^[0-9a-zA-Z]+$/;
     if(address==""){
         document.getElementById("add").innerHTML="Please Enter Your address";

     }
	else if(patt.test(address))
	 {
		 
	     return;
	 
      }
     else{
         document.getElementById("add").innerHTML="Address must have alphanumeric characters only";
        
     }
 
     //to generate random customer id
    var custid='CustID_'+Math.random().toString(36).substr(2,4); 
    var custTran_Id='CustTransID_'+Math.random().toString(36).substr(3,5);
 
 
 var data = {
     
     "customer_id":custid,
    "address":customer.address,
     "email":customer.email,
     "first_name":customer.first_name,
     "last_name":customer.last_name,
     "mob_no":customer.mob_no,
     
     
     
 };
     var trandata={
         "customer_transaction_id":custTran_Id,
         "amount":$scope.amount,
         "customer_id":data.customer_id,
         "description":"complete",
         "order_id":$scope.order_id,
         "seat_catId":$scope.seat_cat_tax
     };
          
      // connect to firebase Object 
         var ref = new Firebase("https://sportsdataevent.firebaseio.com/customer");              
     //add person data to firebase
        ref.push(data);
     
     //connecting to customer transaction in firebase
      var traref = new Firebase("https://sportsdataevent.firebaseio.com/customer_transaction");
     traref.push(trandata);
     
	// window.location.href="index.html#/Success";
             $location.path('/Success');                 
 }
});