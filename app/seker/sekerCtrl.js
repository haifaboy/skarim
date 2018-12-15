app.controller("sekerCtrl", function( $scope , $location , user , mivne ,seker ) {
      
    if   ( ! user.isLoggedIn() ) {   $location.path("/"); } 

    seker.getskarim(); 
    seker.calcskarim() ; 

    $scope.skarim = seker.skarim ; 

    $scope.opensekerline = function (id) {

            
        if ( user.islogedin() ) {  

            $location.path("/sekerlines/" +id ); 
       
        }

    }

    $scope.setcontenteditable = function(inseker){

             
        return ( inseker.id === $scope.sekers[$scope.sekers.length - 1].id && inseker.newseker ===  0 ) ;
        

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
                return user.isSuperUser() ? true : false ;
            default:
             
          } 
        

    }  


     
});
