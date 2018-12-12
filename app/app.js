var app = angular.module("sekerApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "app/home/home.html" , 
        controller: "homeCtrl"
    }).when("/login", {
        templateUrl: "app/login/login.html",
        controller: "loginCtrl"
    }).when("/seker", {
        templateUrl: "app/seker/seker.html",
        controller: "sekerCtrl"
    }).when("/newseker" , {
        templateUrl: "app/newseker/newseker.html",
        controller: "newSekerrCtrl"
    }).when("/sekerlines" , {
        templateUrl: "app/skarlines/skarlines.html",
        controller: "sekerLinesrCtrl"
    }).when("/reports" , {
        templateUrl: "app/reports/reports.html",
        controller: "reportsrCtrl"
    })
    .when("/system" , {
        templateUrl: "app/system/system.html",
        controller: "systemrCtrl"
    })
})