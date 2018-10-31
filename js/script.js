var app = angular.module('celsoLisboa', []);

app.controller('loginController', ['$scope', '$http', function ($scope, $http) {
    $scope.users;

    let baseUrl = 'http://localhost:3000/api/user/login';

    $scope.loginProfile = function (email, password) {
        if (email == undefined || password == undefined) {
            detectedErro("formulario");
        } else {
            authentication(email, password);
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
                window.open("C:/Users/Anderson/Documents/Projetos/R4S Recrutamento/cursos.html", '_self');
            }, function errorCallback(response) {
                console.log("Foi detectada uma falha na conexão com a API", response)
            });
        } else {
            detectedErro("senha/email");
        }
    }

    function detectedErro(e) {
        console.log("e:", e);
    }

}]);