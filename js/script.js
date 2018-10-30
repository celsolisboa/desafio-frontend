var app = angular.module('celsoLisboa', []);

app.controller('loginController', ['$scope', '$http', function ($scope, $http) {
    $scope.users;

    let baseUrl = 'http://localhost:3000/api/user/login';

    // $scope.login = [{
    //     'email': 'john@gmail.com',
    //     'password': 'passwd'
    // },
    // {
    //     'email': 'bill@gmail.com',
    //     'password': 'test123'
    // }]

    $http({
        method: 'POST',
        url: baseUrl,
        data: { email: "john@gmail.com", password: "passwd" }
    }).then(function successCallback(response) {
        console.log("logou", response)
        console.log()
    }, function errorCallback(response) {
        console.log("falhou", response)
    });

}]);