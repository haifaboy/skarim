app.controller("systemrCtrl", function($scope, $location, user,mivne,tables ) {

    tables.getActiveTables()  ;
   
    $scope.tables = [] ;
    $scope.tables = tables.getTables() ;

    $scope.newTable = function(){

        tables.createTable('','') ;
    

    }

    $scope.setcontenteditable = function(intable){

        alert(1)
        return intable.id === $scope.tables[$scope.tables.length].id ;
        

    }

    $scope.saveTable = function(){

       
       


    }


  
});