var app = angular.module('celsoLisboa', []);

app.controller('consultaController', ['$scope', '$http', function ($scope, $http) {

    function detectedErro(e) {
        console.log("Erro encontrado:", e);
    }

    function getCurso() {
        $http.get("http://localhost:3000/api/curso")
            .then(function (response) {
                $scope.infoCurso = response.data;
                $scope.infoCurso = $scope.infoCurso.cursos;

            }, function myError(response) {
                detectedErro("Foi detectada um falha na conexão com a API (Cursos): ", response)
            });
    }
    getCurso();

    $scope.removeCurso = function (posicao) {
        $http.delete('http://localhost:3000/api/curso/' + posicao)
            .then(function () {
                console.log("Curso Removido!");
                getCurso();

            }, function (response) {
                detectedErro(response)
            });
    }

    $scope.addCurso = function(){

    }

}]);