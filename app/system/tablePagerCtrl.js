app.controller("TablePageCtrl", function($scope, $location, user) {
      
    if   ( ! user.isLoggedIn() ) {   $location.path("/"); } 
     
});
