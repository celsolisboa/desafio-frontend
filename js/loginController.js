var app = angular.module('celsoLisboa', []);

app.controller('loginController', ['$scope', '$http', function ($scope, $http) {

    function detectedErro(e) {
        console.log("Erro:", e);
    }

    $scope.loginProfile = function (email, password) {
        if (email == undefined || password == undefined) {
            detectedErro("formulario");
            var x = document.getElementById("login-empty");
            if (x.style.display === "block") {
                x.style.display = "none";
            } else {
                x.style.display = "block";
            }
        } else {

            authentication(email, password);
        }
    }

    function authentication(email, password) {
        if (email == "john@gmail.com" && password == "passwd" ||
            email == "bill@gmail.com" && password == "test123") {

            let info = { email: email, password: password }
            let urlAccess = 'http://localhost:3000/api/user/login';
            acessAPI(urlAccess, info);

        } else {
            detectedErro("senha/email");
            var x = document.getElementById("login-erro");
            if (x.style.display === "block") {
                x.style.display = "none";
            } else {
                x.style.display = "block";
            }
        }
    }

    function acessAPI(urlAccess, info) {
        $http({
            method: 'POST',
            url: urlAccess,
            data: { email: info.email, password: info.password }
        }).then(function successCallback() {
            window.open("cursos.html", '_self');
            getCursos();
        }, function errorCallback(response) {
            console.log("Foi detectada uma falha na conexão com a API (Login)", response)
        });
    }

    function getCursos() {
        $http.get("http://localhost:3000/api/curso")
            .then(function (response) {
                $scope.infoCurso = response.data;
            }, function myError(response) {
                detectedErro("Foi detectada um falha na conexão com a API (Cursos): ", response)
            });
    }
    getCursos();

}]);