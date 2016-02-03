var trialModule = angular.module('ledTrial',['ui.bootstrap','ui.mask','ngStorage']);

angular.module('ledTrial').controller('ledCtrl',
    function ($scope,$modal,$localStorage) {
    $scope.step1 = "Go";
    $scope.step2 = "Go Again";


    $scope.step1_show = true;
    $scope.step2_show = false;

    //array for dynamic selects, we take the brand name from bound model and use it as key for second select loop
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
      }
    }

  });
    modalInstance.result.then(function() {
          //show users
          $scope.step2_show = false;
          $scope.usersShow = true;
          $scope.$storage = $localStorage;
          $scope.users = $scope.$storage.users;
      }, function() {
        //modal dismissed
        console.log('Modal dismissed at: ' + new Date());
      });

}


var ModalInstanceCtrl = function ($scope, $modalInstance, user,$localStorage) {

  $scope.user = user;

  $scope.$storage = $localStorage;
  $scope.ok = function () {
    //save here
    if ($scope.$storage.users)
    {
      $scope.$storage.users.push(user);
    }
    else{
      $scope.$storage.users = [];
      $scope.$storage.users.push(user);
    }
    $modalInstance.close();

  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};

});



