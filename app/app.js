var trialModule = angular.module('ledTrial',['ui.bootstrap','ui.mask']);

angular.module('ledTrial').controller('ledCtrl',
    function ($scope,$modal) {
    $scope.step1 = "Go";
    $scope.step2 = "Go Again";


    $scope.step1_show = true;
    $scope.step2_show = false;

    //array for dynamic selects
    $scope.cars = {
    "Mazda":["3","5"],
    "Honda":["Civic","Accord"]
    };



    $scope.step12_change = function(){
        if ($scope.step1_show)
        {
            $scope.step1_show = false;
            $scope.step2_show = true;
        }
        else{
            $scope.step2_show = false;
            $scope.step1_show = true;
        }
    };

    $scope.step2_next = function(){
        //$scope.step2_show = false;

    var modalInstance = $modal.open({
      templateUrl: 'SaveCancel.html',
      controller: ModalInstanceCtrl,
      resolve: {
        user: function () {
          return $scope.user;
      },

    }

  });
}


var ModalInstanceCtrl = function ($scope, $modalInstance, user) {

  $scope.user = user;

  $scope.ok = function () {
    //save here
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};

});



