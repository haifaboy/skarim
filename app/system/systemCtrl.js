app.controller("systemrCtrl", function($scope, $location, user, tables  ) {

    if   ( ! user.isLoggedIn() ) {   $location.path("/"); } 


    $scope.tables  = [];
    tables.getActiveTables().then(function(tables) {
      $scope.tables = tables ;
  }, function(error) {
      $log.error(error);
    });

   
    $scope.newTable = function(){

      
        tables.createTable('','') ;
       
      
    }

    $scope.showitem  = function(item) {

        switch(item) {
            case 'systemnew':
                  
                    return user.isSuperUser() ? true : false ;
            default:
             
          } 
        

    }

    $scope.setcontenteditable = function(intable){

             
        return ( intable.id === $scope.tables[$scope.tables.length - 1].id && intable.json ===  1 ) ;
        

    }

    $scope.opentable = function(table) {


        $location.path("/tablepage/" +table.name ); 
  
      
    }   

  
});