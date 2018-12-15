
app.controller("tablePageCtrl", function($scope, $location,  $routeParams , user ,mivne  ) {
      
    if   ( ! user.isLoggedIn() ) {   $location.path("/"); } 

    $scope.id = $routeParams.id;  
    var issuperuser = user.isSuperUser() ;

    $scope.tableheads = [] ;
    $scope.tableitems = [] ;

    

    $scope.tablenonvisile=[] ; 

    $scope.showitem  = function(item) {

         switch(item) {
            case 'tablepagenew1' , 'tablepagenew2' :
                return user.isSuperUser() ? true : false ;
            default:
             
          } 
        

    }

    

    $scope.showhead  = function() { 

        switch($scope.id) {
            case 'משתמשים'  :

                $scope.tableheads[0] = 'תעודת זהות' ; 
                $scope.tableheads[1] = 'מס עובד' ; 
                $scope.tableheads[2] = 'ת.ז' ; 
                $scope.tableheads[3] = 'שם' ;
                $scope.tableheads[4] = 'יחידה' ;
                $scope.tableheads[5] = 'הרשאה' ;
                $scope.tableheads[6] = 'סיסמא' ;
                $scope.tableheads[7] = 'דואל' ;
                if (!issuperuser) 
                { 
                    $scope.tablenonvisile[1] = $scope.tableheads[5] ; 
                    $scope.tablenonvisile[2] = $scope.tableheads[6] ;

                    
                }
                break ;
/*
                "id": 1,
                  "tz": "022659049",
                  "name": "אבי כהן",
                  "unit": "10000",
                  "usertype": "SU",
                  "comp": "HHI",
                  "pass": "tazl0000",
                  "email": "haifaboy@gmail.com"  */

            case 'מבנים' :
                
                $scope.tableheads[0] = 'מספר מבנה' ; 
                $scope.tableheads[1] = 'תאור' ; 
                $scope.tableheads[2] = 'יחידה' ; 
                $scope.tableheads[3] = 'סוג מבנה' ;
                $scope.tableheads[4] = 'אחראי מבנה' ;
               
                break ;
            

            /* "comp": "HHI",
                  "id": 1,
                  "desc": "מעבדה 1",
                  "unit": "15000",
                  "type": "R"  */


            default:

        } 

        
        
    }


    $scope.showheader = function (intable) {

        var show = true ;
          
        for ( var  i = 0 ; i < $scope.tablenonvisile.length ; i++ ) {
              
           
            if ( $scope.tablenonvisile[i] === intable ) show = false ;  
        }

        return show ;
            

    }

    $scope.setcontenteditable = function(intable){

        var numOfItems ;

        switch($scope.id) {
            case 'משתמשים'  :
            
              
                alert($scope.tableitems.lenght);
           
                break ;
                
            case 'מבנים' :

                $scope.tableitems = mivne.getMivnim() ; 
                break ;
              
            default:

        } 

      
      // numOfItems = $scope.tableitems.lenght ;

      // alert(numOfItems);
       
               
      //  return ( intable.id === $scope.tableitems[numOfItems - 1].id && intable.json ===  0 ) ;
        

    }

    $scope.showhead() ;
    $scope.setcontenteditable();
});
