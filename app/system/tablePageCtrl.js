
app.controller("tablePageCtrl", function($scope, $location,  $routeParams , user ,mivne  ) {
      
    if   ( ! user.isLoggedIn() ) {   $location.path("/"); } 

    $scope.id = $routeParams.id;  
    var issuperuser = user.isSuperUser() ;

    $scope.tableheads = [] ;
    $scope.tableitems = [] ;
    $scope.tablenonvisile=[] ; 

    $scope.showitem  = function(item) {

         
         switch(item) {
            case 'tablepagenew-משתמשים' : 
            case 'tablepagenew-מבנים' :
                return user.isSuperUser() ? true : false ;
            default:
             
          } 
        

    }

    

    $scope.showhead  = function() { 

        switch($scope.id) {
            case 'משתמשים'  :

                $scope.tableheads[0] = 'תעודת זהות' ; 
                $scope.tableheads[1] = 'מס עובד' ; 
                $scope.tableheads[2] = 'שם' ;
                $scope.tableheads[3] = 'יחידה' ;
                $scope.tableheads[4] = 'הרשאה' ;
                $scope.tableheads[5] = 'סיסמא' ;
                $scope.tableheads[6] = 'דואל' ;
                if (!issuperuser) 
                { 
                    $scope.tablenonvisile[1] = $scope.tableheads[4] ; 
                    $scope.tablenonvisile[2] = $scope.tableheads[5] ;

                    
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

    function myUser(user){

         
        this.tz = user.tz  ;
        this.id = user.id ;
        this.name = user.name ;
        this.unit = user.unit ;
        

        if ( issuperuser) {
          
            this.usertype = user.usertype ;
            this.pass = user.pass ;
            
         } 

         this.email = user.email ;
         this.json = user.json ;


    }

    function myMivne(smivne){


        
        this.id = smivne.id;
        this.desc = smivne.desc;
        this.unit = smivne.unit;
        this.type = mivne.getMivneTypeDesc(smivne.type);
        this.super = user.getMivneSuperviser(smivne.unit) ;
      
        this.json = smivne.json ;
     

    }

    $scope.showdetails = function() {


        switch($scope.id) {
            case 'משתמשים'  :
           
       
                        user.getallusers().then(function(users) {

                        for ( var i = 0 ; i < user.users.length ; i++) {


                            var suser = new myUser(user.users[i]) ;

                            $scope.tableitems.push(suser) } ;

                           
                            
                            }, function(error) {
                                $log.error(error);
                });  
             
                            
                break ;              
            case 'מבנים' :

            mivne.getActiveMivnim().then(function(mivnim) {

                for ( var i = 0 ; i < mivne.mivnim.length ; i++) {

                    var smivne = new myMivne(mivne.mivnim[i]) ;

                    $scope.tableitems.push(smivne) } ;
                       
                    }, function(error) {
                          $log.error(error);
                });
              
                break ;
              
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

                      
        return ( intable.id === $scope.tableitems[$scope.tableitems.length - 1].id && intable.json ===  0 ) ;
        

    }

    $scope.goback = function(){


           $location.path('/system')

    }


    $scope.showhead() ;
    $scope.showdetails();
    
});
