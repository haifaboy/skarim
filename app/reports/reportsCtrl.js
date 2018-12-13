app.controller("reportsrCtrl", function($scope, $location, user) {
    

    if   ( ! user.isLoggedIn() ) {   $location.path("/"); } 

});
