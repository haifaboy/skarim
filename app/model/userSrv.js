app.factory("user", function($q, $http) {

    var activeUser = getlocal() ;
    var imgprepath = "app/pics/" ; 
    var users = [] ;
    var comp = getcomp() ; 
    var wasEverLoaded = false ;

    
   function User(plainUser) {

        this.id = plainUser.id;
        this.tz = plainUser.tz;
        this.name = plainUser.name;
        this.unit = plainUser.unit;
        this.usertype = plainUser.usertype;
        this.comp = plainUser.comp;
        this.pass = plainUser.pass;
        this.email = plainUser.email;

        
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
                   
                
                activeUser = new User(response.data[0]);
                setlocal(response.data[0]) ;
                user.getallusers() ;
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

        if (isLoggedIn() && ( activeUser.usertype === "SU" ||  activeUser.usertype === "SAFTYDEP")) {

            if (wasEverLoaded) {
                async.resolve(mivnim);
            } else {
                   
                var UsersURL = "https://my-json-server.typicode.com/haifaboy/skarim/users?comp=" +
             activeUser.comp; 
             
                
                $http.get(UsersURL).then(function(response) {
     
                   for (var i = 0; i < response.data.length; i++) {
                        var user = new User(response.data[i]);
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
    function logout() {

        activeUser = null ;
        remlocal() ;
      
    }

    return {
        login: login,
        isLoggedIn: isLoggedIn,
        logout: logout,
        getActiveUser: getActiveUser,
        isVisibleMenuItem: isVisibleMenuItem ,
        getcomimg : getcomimg ,
        getcompsite : getcompsite,
        getallusers : getallusers,
        getcomp : getcomp
    }
})