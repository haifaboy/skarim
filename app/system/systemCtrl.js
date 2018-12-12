app.controller("systemrCtrl", function($scope, $location, user,mivnim,tables ) {

  
     
    tables.getActiveTables()  ;

    $scope.tables = tables.getTables() ;

    alert(tables.length);
  
 
});
