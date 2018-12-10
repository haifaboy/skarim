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

        var loginURL = "https://my-json-server.typicode.com/haifaboy/skarim/users" +
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
       activeUser ? true : false;
    }

    function logout() {
        activeUser = null;
    }

    function getActiveUser() {
        return activeUser;
    }

    return {
        login: login,
        isLoggedIn: isLoggedIn,
        logout: logout,
        getActiveUser: getActiveUser
    }
})