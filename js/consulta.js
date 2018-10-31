var app = angular.module('celsoLisboa', []);

app.controller('consultaController', ['$scope', '$http', function ($scope, $http) {

    function detectedErro(e) {
        console.log("e:", e);
    }

    function getAPI() {
        $http.get("http://localhost:3000/api/curso")
            .then(function (response) {
                $scope.infoCurso = response.data;
                console.log($scope.infoCurso.cursos);
                $scope.infoCurso = $scope.infoCurso.cursos;

            }, function myError(response) {
                console.log("teste");

                detectedErro("Foi detectada um falha na conexão com a API (Cursos): ", response)
            });
    }
    getAPI();

}]);