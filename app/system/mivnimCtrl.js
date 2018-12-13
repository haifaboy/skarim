app.controller("mivnimCtrl", function($scope, $location, user) {
      
    if   ( ! user.isLoggedIn() ) {   $location.path("/"); } 
     
});
