app.controller("loginCtrl", function($q ,$scope, $location, user , mivne) {
    
   
    $scope.invalidLogin = false;
    $scope.remember = false ;
    $scope.showloginform = false ;

   

    $scope.login = function() {
        $scope.invalidLogin = false;

        user.login($scope.tz, $scope.pwd).then(function() {
            // success login
            mivne.getActiveMivnim().then( function() {
  
                $location.path("/")
             
            }, function(error) {
                               
            });

           
        }, function(error) {
            // failed login
            $scope.invalidLogin = true;
        })
    }

    $scope.showlogin = function  () {

       $scope.showloginform =! $scope.showloginform  ;   
   
    } 
    $scope.showform = function() {
 
      return($scope.showloginform)

    }
 
    $scope.rememverMy = function  () {
  
        
        localStorage.removeItem('Name');
        localStorage.removeItem('RememberMe');
          
        if($scope.remember){
            localStorage.Name =  $scope.tz ;
            localStorage.RememberMe  =  "yes" ;
        } else {

            localStorage.Name =  null ;
            localStorage.RememberMe  =  "no" ;

        }
 

 }  

 $scope.getRemeber = function () {

   
    if ( localStorage.RememberMe === 'yes' ) {
        
        $scope.tz = localStorage.Name ; 

        if  (localStorage.RememberMe === 'yes' )  {

            $scope.remember = true ; 
        }
    }
  
 }  

 

 $scope.checkdigit = function ()
 {
    
    var async = $q.defer();

    var isvalid = false  ; 

      isvalid = !isNaN($scope.tz)  &&  $scope.tz < 1000000000 ; 

     
      if  ( !isvalid  ) { 
        
        swal({
            text: "הכנס רק ספרות - עד 9 ספרות" ,
            icon: "warning" , 
            button: {
                text: "סגור",
              } } )
          
          $scope.tz = "" ;
         
        } ;

      return isvalid ;
 } 

$scope.getRemeber()

    

    

});