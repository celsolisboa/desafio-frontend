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
                detectedErro("Foi detectada um falha na conexão com a API (Remoção Curso): ", response)
            });
    }

    $scope.addCurso = function (curso, professor, novaSala, horarioInicio, horarioFinal) {
        $http.get("http://localhost:3000/api/professor")
            .then(function (response) {
                let novoID = $scope.infoCurso.length += 1;
                console.log("response", response);
                if (curso, professor, novaSala, horarioInicio, horarioFinal) {
                    $scope.newCurse = { curso, professor, novaSala, horarioInicio, horarioFinal, novoID }
                    postNewCurse($scope.newCurse);
                } else {
                    console.log("deu ruim")
                }

            }, function myError(response) {
                detectedErro("Foi detectada um falha na conexão com a API (Professores): ", response)
            });


    }

    function postNewCurse(cursoInfo) {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/api/curso',
            data: {
                id: cursoInfo.novoID,
                nome: cursoInfo.curso,
                inicio: [
                    cursoInfo.horarioInicio
                ],
                fim: cursoInfo.horarioFinal,
                salas: {
                    id: cursoInfo.novoID,
                    sala: cursoInfo.novaSala
                },
                professores: [
                    {
                        id: cursoInfo.novoID,
                        nome: cursoInfo.professor
                    }
                ]
            }
        }).then(function successCallback() {
            location.reload();
        }, function errorCallback(response) {
            console.log("Foi detectada uma falha na conexão com a API (Login)", response)
        });
    }

}]);