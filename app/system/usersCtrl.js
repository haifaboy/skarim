app.controller("usersCtrl", function($scope, $location, user) {
      
    if   ( ! user.isLoggedIn() ) {   $location.path("/"); } 
     
});
