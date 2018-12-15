app.factory("user", function($q, $http) {

    var activeUser = getlocal() ;
    var imgprepath = "app/pics/" ; 
    var users = [];
    var comp = getcomp() ; 
    var wasEverLoaded  ;
    
   function User(plainUser , flag) {

        this.id = plainUser.id;
        this.tz = plainUser.tz;
        this.name = plainUser.name;
        this.unit = plainUser.unit;
        this.usertype = plainUser.usertype;
        this.comp = plainUser.comp;
        if ( flag === 0 || isSuperUser()) { this.pass = plainUser.pass; } else {this.pass = '' } ;  
        this.email = plainUser.email;
        this.json = flag ; 

        
    }

    function getNextId()
    {

      var nextid = 0 ;

      for ( var i = 0 ;  i < users.length ; i++ ) {

                    
           if ( users[i].id > nextid ) { nextid = users[i].id }

          }


      return nextid + 1 ; 


    }


    function addUser(tz,name,unit,usertype,pass,email) {

        var suser ;

        suser.id  = getNextId() ;
        suser.tz = tz;
        suser.name = name;
        suser.unit = unit;
        suser.usertype = usertype;
        suser.comp = activeuser.comp;
        suser.pass = pass;
        suser.email = email;

        var newuser = new User(suser,1);
        users.push(newuser) ;

    }


    function getUserDetails(id) {

        var user = null ; 

        for ( var i = 0 ;  i < users.length ; i++ ) {
     
            if ( users[i].id === id )  { 
               
                user = users[i] ;
                i = users.length + 1 ; 
            }

        }

        return user ; 

    }

    function setlocal(plainUser) {

     
        localStorage.setItem ( "id" , plainUser.id  ) ;
        localStorage.setItem ( "tz" , plainUser.tz  ) ;
        localStorage.setItem ( "name" , plainUser.name  ) ;
        localStorage.setItem ( "unit" , plainUser.unit  ) ;
        localStorage.setItem ( "usertype" , plainUser.usertype  ) ;
        localStorage.setItem ( "comp" , plainUser.comp  ) ;
        localStorage.setItem ( "pass" , plainUser.pass  ) ;
        localStorage.setItem ( "email" , plainUser.email  ) ;
      

    }

    function isSuperUser(){

        return activeUser.usertype === "SU" ;

    }

    function isSafety(){

        return activeUser.usertype === "SAFTYDEP" ;

    }




    function getlocal() {

       
        if (localStorage.getItem ( "id" ) ) { 

            
            this.id = localStorage.getItem ( "id" ) ;
            this.tz = localStorage.getItem ( "tz" ) ;
            this.name = localStorage.getItem ( "name" ) ;
            this.unit = localStorage.getItem ( "unit" ) ;
            this.usertype = localStorage.getItem ( "usertype" ) ;
            this.comp = localStorage.getItem ( "comp" ) ;
            this.pass = localStorage.getItem ( "pass" ) ;
            this.email = localStorage.getItem ( "email" ) ; 
            return this ;

        } else {

            return null ;
        } 

            
    }

    function remlocal(plainUser) {

        localStorage.removeItem ( "id" ) ;
        localStorage.removeItem ( "tz" ) ;
        localStorage.removeItem ( "name" ) ;
        localStorage.removeItem ( "unit" ) ;
        localStorage.removeItem ( "usertype" ) ;
        localStorage.removeItem ( "comp" ) ;
        localStorage.removeItem ( "pass" ) ;
        localStorage.removeItem ( "email") ;

    }

    function login(tz, pwd) {
        var async = $q.defer();
        
       
        var loginURL = "https://my-json-server.typicode.com/haifaboy/skarim/users?tz=" +
               tz + "&pass=" + pwd;  
       
            $http.get(loginURL).then(function(response) {
                if (response.data.length > 0) {
                 
                activeUser = new User(response.data[0],0);
                setlocal(response.data[0]) ;
               
                async.resolve(activeUser);
               
              
                } else {
                    
                    activeUser =  null ;
                    async.reject("תעודת זהות או סיסמא שגויה")
                }
            }, function(error) {
                async.reject(error);
            });

      

        return async.promise;
    }

    function getallusers()
    {
        var async = $q.defer();  

        
        if (isLoggedIn())  {

            if (users.length > 0 ) {
                async.resolve(users);
            } else {
                   
                var UsersURL = "https://my-json-server.typicode.com/haifaboy/skarim/users?comp=" +
                activeUser.comp; 
             
                
                $http.get(UsersURL).then(function(response) {
     
                   
                   for (var i = 0; i < response.data.length; i++) {
                        var user = new User(response.data[i],1);
                        users.push(user);
                    }
                     
                    wasEverLoaded = true;
                    async.resolve(users);
                }, function(error) {
                    async.reject(error);
                });
            }
         

        } 
     
        return async.promise; 


    }

    function getnumofusers()
    {
            
        return users.length;
            
    }

    
    function isLoggedIn() {

     
      return activeUser == null ?  false : true   ; 
    }

  
    function getActiveUser() {
               
        return activeUser;
    }

    function getcomp(){

         if ( activeUser && activeUser.comp) {

            return activeUser.comp

         } else {

              return ''
         }

    }

    function getcomimg ()
    {

        var imgpath  = ''
        
        if ( comp ) {

        switch(comp) {
            case "HHI":
            imgpath = imgprepath + activeUser.comp+ '.png'
              break;
            default:
             
          }

        }

        return imgpath  ;   

    }
    function getcompsite ()
    {

        var siteurl = ''

        if ( comp ) {

        switch(comp) {
            case "HHI":
            siteurl = 'http://www.iec.co.il'
              break;
            default:
             
          }

        }

        return siteurl  ;   

    }

    function isVisibleMenuItem ( menuItem )
    {

         var visible  = false ;

         switch(menuItem) {
            case 'skarim':
                visible = true ;
                break;
            case 'rep' :

                visible = true ; 
             
              break;
              case 'system' :

                  visible  =  activeUser.usertype === "SU" ||  activeUser.usertype === "SAFTYDEP"  ; 
 
            default:
              
          }

        

          
         return visible ; 


    }


    function getMivneSuperviser(unit)   {

        var supervisor='' ;

        for  ( var i = 0 ; i < users.length ; i++) {

            if ( users[i].unit === unit && users[i].usertype === "UNITSUPER" ) {

                supervisor = users[i].name

             }   

        } 

        


        return supervisor ; 

    }

    function logout() {

        activeUser = null ;
        remlocal() ;





      
    }

     

    getallusers().then(function(users) {
         
         }, function(error) {
        $log.error(error);
        }); 

    return {
        login: login,
        isLoggedIn: isLoggedIn,
        logout: logout,
        getActiveUser: getActiveUser,
        isVisibleMenuItem: isVisibleMenuItem ,
        getcomimg : getcomimg ,
        getcompsite : getcompsite,
        getallusers : getallusers,
        getcomp : getcomp,
        isSuperUser : isSuperUser,
        getnumofusers : getnumofusers ,
        isSafety : isSafety ,
        addUser : addUser ,
        getUserDetails : getUserDetails ,
        getMivneSuperviser : getMivneSuperviser ,
        users : users
    }
})