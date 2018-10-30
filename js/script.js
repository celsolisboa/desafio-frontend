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

    $scope.loginProfile = function () {

        if ($scope.accessEmail == "john@gmail.com" ||
            $scope.accessEmail == "bill@gmail.com") {
            authentication($scope.accessEmail, $scope.accessPassword);
        }
    }

    function authentication(email, password) {
        if (email == "john@gmail.com" && password == "passwd" ||
            email == "bill@gmail.com" && password == "test123") {
            $http({
                method: 'POST',
                url: baseUrl,
                data: { email: email, password: password }
            }).then(function successCallback(response) {
                console.log("logou", response)
            }, function errorCallback(response) {
                console.log("falhou", response)
            });
        }
    }

}]);