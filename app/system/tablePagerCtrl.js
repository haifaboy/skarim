app.controller("TablePageCtrl", function($scope, $location, , $routeParams , user) {
      
    if   ( ! user.isLoggedIn() ) {   $location.path("/"); } 

     $scope.ID = $routeParams.ID;  
     
     alert ($scope.ID )
});
