app.factory("user", function($q, $http) {

    var activeUser = null;
    
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

    function login(tz, pwd) {
        var async = $q.defer();

        var loginURL = "https://my-json-server.typicode.com/haifaboy/skarim/users?tz=" +
            tz + "&pass=" + pwd;  
       
        $http.get(loginURL).then(function(response) {
            if (response.data.length > 0) {
                // success login
              
               activeUser = new User(response.data[0]);
            
              // alert(JSON.stringify(response.data[0]));
                async.resolve(activeUser);
              //  alert(JSON.stringify(activeUser));

            } else {
                // invalid email or password
              
                async.reject("invalid email or password")
            }
        }, function(error) {
            async.reject(error);
        });

        return async.promise;
    }

    function isLoggedIn() {
       return activeUser ? true : false;
    }

  
    function getActiveUser() {
        return activeUser;
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

        activeUser = null;
    }

    return {
        login: login,
        isLoggedIn: isLoggedIn,
        logout: logout,
        getActiveUser: getActiveUser,
        isVisibleMenuItem: isVisibleMenuItem 
    }
})