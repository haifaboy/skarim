
app.controller("navbarCtrl", function($scope, user, $location) {
    
       
    
    $scope.isUserLoggedIn = function() {
        return user.isLoggedIn();
    }

    $scope.isUserLoggedIAndVisble =  function(menuItem) {

       
        return  user.isLoggedIn() && user.isVisibleMenuItem (menuItem)  ;
     }

    $scope.logout = function() {
        user.logout();
        $location.path("/");
    }

    $scope.username =  user.isLoggedIn() ? user.getActiveUser().name : null ; 

});