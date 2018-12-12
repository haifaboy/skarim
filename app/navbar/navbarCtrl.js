
app.controller("navbarCtrl", function($scope, user, $location) {
    
    $scope.gohome = function() {
      
        if ( user.isLoggedIn() ) {
            
           $location.path("/")  } 

   }

   
   
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



    
    $scope.username =  user.isLoggedIn() ? user.getActiveUser().name : '' ; 
    $scope.comp = user.isLoggedIn() ? user.getActiveUser().comp : '' ; 
    $scope.imgpath = user.isLoggedIn() ? user.getcomimg() : '' ;
    $scope.compsite = user.isLoggedIn() ? user.getcompsite() : '';  

});