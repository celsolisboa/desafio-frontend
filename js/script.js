var app = angular.module('celsoLisboa', []);

app.controller('loginController', ['$scope', '$http', function ($scope, $http) {
    $scope.users;

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

            let info = { email: email, password: password }
            let urlAccess = 'http://localhost:3000/api/user/login';
            postAPI(urlAccess, info);

        } else {
            detectedErro("senha/email");
        }
    }

    function detectedErro(e) {
        console.log("e:", e);
    }

    function postAPI(urlAccess, info) {
        $http({
            method: 'POST',
            url: urlAccess,
            data: { email: info.email, password: info.password }
        }).then(function successCallback(response) {
            window.open("C:/Users/Anderson/Documents/Projetos/R4S Recrutamento/cursos.html", '_self');
            getAPI();
        }, function errorCallback(response) {
            console.log("Foi detectada uma falha na conexão com a API (Login)", response)
        });
    }

    function getAPI() {
        $http.get("http://localhost:3000/api/curso")
            .then(function (response) {
                $scope.infoCurso = response.data;
                console.log($scope.infoCurso);
                console.log("teste");


            }, function myError(response) {
                console.log("teste");
                
                detectedErro("Foi detectada um falha na conexão com a API (Cursos): ", response)
            });
    }
    getAPI();

}]);