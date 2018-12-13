app.controller("systemrCtrl", function($scope, $location, user,mivne,tables  ) {

    if   ( ! user.isLoggedIn() ) {   $location.path("/"); } 

    tables.getActiveTables()  ;
   
    $scope.tables = [] ;
    $scope.tables = tables.getTables() ;

    $scope.newTable = function(){

      
        tables.createTable('','') ;
       
        
      
    }

    $scope.setcontenteditable = function(intable){

                   
        return ( intable.id === $scope.tables[$scope.tables.length - 1].id && intable.json ===  0 ) ;
        

    }

    $scope.opentable = function(table) {


        $location.path("/tablepage/" +table.id ); 
  
      
    }   

  
});