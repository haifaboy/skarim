app.controller("sekerCtrl", function( $scope , $location , user , mivne ,seker ) {
      
    if   ( ! user.isLoggedIn() ) {   $location.path("/"); } 

    $scope.filterfild = -1 ;

    seker.getskarim().then(function(skarim) {
      $scope.skarim = skarim ;

      
    
      seker.calcskarim() ; 

      
       }, function(error) {
      $log.error(error);
    });  
  


     $scope.opensekerline = function (id) {

       
        if ( user.isLoggedIn() ) {  
             $location.path("/sekerlines/" +id ); 
       
        }

    }

    $scope.setcontenteditable = function(inseker){

        

       return ( inseker.id === $scope.skarim[$scope.skarim.length - 1].id && inseker.newseker ===  0 ) ;
        

    }

    $scope.getuserdetails = function(id) {

        return user.getUserDetails(id) ; 
    }


    $scope.getMivneDetails = function (id) {
 
        return mivne.getMivneById(id)  ;


    }

    $scope.showitem  = function(item) {

       

        switch(item) {
            case 'sekernew':
                return user.isSuperUser() || user.isSafety() ? true : false ;
            default:
             
          } 
        

    }  

    $scope.propName = "";
    $scope.direction = false;
    $scope.sortBy = function(prop) {
      if (prop !== $scope.propName) {
        // This is the first time the user clicks on this header
        $scope.propName = prop;
        $scope.direction = false;
      } else {
        $scope.direction = !$scope.direction;
  
        
      }
    }

    $scope.getSortingClass = function(header) {
        return {
          'fas': true,
          'fa-sort': $scope.propName !== header,
          'fa-sort-down': $scope.propName === header && !$scope.direction,
          'fa-sort-up': $scope.propName === header && $scope.direction
        }
    }

    $scope.searchText = "";

    $scope.filterSkarim = function(inseker) {

         
        switch($scope.filterfild) {
            case '1' :
 
            
               
                if (JSON.stringify(inseker.id).toLowerCase().includes($scope.searchText.toLowerCase()) ||
                JSON.stringify(inseker.id).toLowerCase().includes($scope.searchText.toLowerCase())) {
                   return true;
                } else {
                   return false;
                }
                 

            case '2' :
 
                if (JSON.stringify(inseker.seker_date).toLowerCase().includes($scope.searchText.toLowerCase()) ||
                    JSON.stringify(inseker.seker_date).toLowerCase().includes($scope.searchText.toLowerCase())) {
                   return true;
                } else {
                   return false;
                }

            case '3' :
             
                if (inseker.unit.toLowerCase().includes($scope.searchText.toLowerCase()) ||
                    inseker.unit.toLowerCase().includes($scope.searchText.toLowerCase())) {
                   return true;
                } else {
                   return false;
                }

            case '4' :
                if (inseker.desc.toLowerCase().includes($scope.searchText.toLowerCase()) ||
                    inseker.desc.toLowerCase().includes($scope.searchText.toLowerCase())) {
                   return true;
                } else {
                   return false;
                }

            case '5' :
                if ($scope.getuserdetails(inseker.id).name.toLowerCase().includes($scope.searchText.toLowerCase()) ||
                    $scope.getuserdetails(inseker.id).name.toLowerCase().includes($scope.searchText.toLowerCase())) {
                   return true;
                } else {
                   return false;
                }

            case '6' :
                if ($scope.getMivneDetails(inseker.mivneid).desc.toLowerCase().includes($scope.searchText.toLowerCase()) ||
                $scope.getMivneDetails(inseker.mivneid).desc.toLowerCase().includes($scope.searchText.toLowerCase())) {
                   return true;
                } else {
                   return false;
                }
            case '7' :
                if (inseker.status.toLowerCase().includes($scope.searchText.toLowerCase()) ||
                    inseker.status.toLowerCase().includes($scope.searchText.toLowerCase())) {
                   return true;
                } else {
                   return false;
                }
            default:
            return true ;
              
          }

       
     
    }

    $scope.clearSearchText = function(){

    

        $scope.searchText ='' ;

    }

    $scope.newseker = new function() {


       


    }


     
});
