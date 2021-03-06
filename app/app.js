var trialModule = angular.module('ledTrial',['ui.bootstrap','ui.mask','ngStorage']);

angular.module('ledTrial').controller('ledCtrl',
    function ($scope,$modal,$localStorage) {

    $scope.formFlag = false;
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


    //fetch users from localStorage
    $scope.$storage = $localStorage;
    $scope.users = $scope.$storage.users;

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
          //show users, fetch again since we have new user saved
          $scope.step2_show = false;
          $scope.usersShow = true;
          $scope.$storage = $localStorage;
          $scope.users = $scope.$storage.users;
          $scope.formFlag = true;
      }, function() {
        //modal dismissed
        console.log('Modal dismissed at: ' + new Date());
      });

}

//scope.users is a reference to localstorage.users
$scope.deleteUser = function(user){
  $scope.users.pop(user);

};

$scope.registerShow = true;
//SPA with 2 "pages"
$scope.showRegister = function(){
  if ($scope.formFlag)
  {
    window.location.reload();
  }
  else{
  $scope.registerShow = true;
  $scope.usersShow = false;
}
}

$scope.showUsers = function(){
  $scope.registerShow = false;
  $scope.usersShow = true;
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



