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
        if ($scope.form != undefined) {
            console.log("enviou")
            authentication($scope.form.accessEmail, $scope.form.accessPassword);
        } else {
            console.log("Complete todos os campos");
        }
    }

    function authentication(email, password) {
        console.log("form:", $scope.form)
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