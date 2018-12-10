app.controller("loginCtrl", function($scope, $location, user) {
    
    $scope.tz = "022659049";
    $scope.pwd = "tazl0000";

    $scope.invalidLogin = false;

    $scope.login = function() {
        $scope.invalidLogin = false;

        user.login($scope.tz, $scope.pwd).then(function() {
            // success login
           $location.path("/")
        }, function(error) {
            // failed login
            $scope.invalidLogin = true;
        })
    }
});