var trialModule = angular.module('ledTrial',['angularModalService']);

angular.module('ledTrial').controller('ledCtrl',
    function ($scope,ModalService) {
    $scope.step1 = "Go";
    $scope.step2 = "Go Again";
    $scope.step3 = "save data";

    $scope.step1_show = true;
    $scope.step2_show = false;
    $scope.step3_show = false;

    $scope.step1_click = function(){
        $scope.step1_show = false;
        $scope.step2_show = true;

    }

    $scope.step2_click = function(){
        $scope.step2_show = false;

        ModalService.showModal({
        templateUrl: "yesno.html",
        controller: "saveCtrl"
    }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
        $scope.saveResult = result ? "Save success" : "";
      });
    });

  };


});

angular.module('ledTrial').controller('saveCtrl', ['$scope', 'close', function($scope, close) {

  $scope.close = function(result) {
      close(result, 500); // close, but give 500ms for bootstrap to animate
  };

}]);

