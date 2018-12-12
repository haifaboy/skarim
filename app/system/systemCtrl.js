app.controller("systemrCtrl", function($scope, $location, user,mivne,tables ) {

    tables.getActiveTables()  ;
   
    $scope.tables = [] ;
    $scope.tables = tables.getTables() ;

    $scope.newTable = function(){

        tables.createTable('','') ;
    

    }

    $scope.setcontenteditable = function(intable){

        alert(1)
        return intable === $scope.tables[$scope.tables.length] ;
        

    }

    $scope.saveTable = function(){

       
       


    }


  
});