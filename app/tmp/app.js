var app = angular.module("sekerApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "app/home/home.html"
    }).when("/login", {
        templateUrl: "app/login/login.html",
        controller: "loginCtrl"
    }).when("/skarim", {
        templateUrl: "app/skarim/skarim.html",
        controller: "skarimCtrl"
    }).when("/newseker" , {
        templateUrl: "app/skarim/newseker.html",
        controller: "newSeker"
    }).when("/sekerlines" , {
        templateUrl: "app/skarlines/skarlines.html",
        controller: "sekerLines"
    })
})