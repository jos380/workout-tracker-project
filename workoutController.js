
angular.module('workoutApp')
  .controller('WorkoutController', ['$scope', '$http', function($scope, $http) {
    $http.get('/workouts')
      .then(response => {
        $scope.workouts = response.data;
      });

    $scope.addWorkout = function() {
      const formData = new FormData();
      formData.append('exercise', $scope.newWorkout.exercise);
      formData.append('duration', $scope.newWorkout.duration);
      formData.append('caloriesBurned', $scope.newWorkout.caloriesBurned);
      formData.append('media', $scope.newWorkout.media);

      $http.post('/workouts', formData, { headers: { 'Content-Type': undefined } })
        .then(response => {
          $scope.workouts.push(response.data);
        });
    };
  }]);
