app.controller("sekerCtrl", function($scope, $location , user ) {
      
    if   ( ! user.isLoggedIn() ) {   $location.path("/"); } 
     
});
