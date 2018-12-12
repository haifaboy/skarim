app.controller("systemrCtrl", function($scope, $location, user,tables) {


    tables.getActiveTables()  

    $scope.tables = tables.getTables() ;

    alert(tables.length);
  

   
 
});
