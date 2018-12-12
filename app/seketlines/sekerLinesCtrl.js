app.controller("loginCtrl", function($scope, $location, user) {
    
   
    $scope.invalidLogin = false;
    $scope.remember = false ;
    $scope.showloginform = false ;

   

    $scope.login = function() {
        $scope.invalidLogin = false;

        user.login($scope.tz, $scope.pwd).then(function() {
            // success login
           $location.path("/")
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

 $scope.getRemeber()

    

    

});