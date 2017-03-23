{
  angular.module("app", ["chart.js"]).controller("AppController", function($scope) {
    $scope.pvToFv = true;
    $scope.togglePvToFv = function() {
      $scope.pvToFv = !$scope.pvToFv;
    }
    $scope.validationTypePeriod = function(string) {
      if (string == "" || !string) {
        return false;
      } else {
        return true;
      }
    }
    $scope.numberValidation = function(string) {
      if (!isNaN(string)) {
        if (string != 0) {
          return true;

        }
      } else {
        return false;
      }

    }
    $scope.calculateFVfromPV = function(pv, pmt, rate, numPeriod, typePeriod) {
      var array = [],
      labelarray = [],
      currentAmount = 0;

      console.log(pv, pmt, rate, numPeriod, typePeriod);
      array.push(pv);
      var currentDate = moment();
      labelarray.push(currentDate.format("MMM YY"));

      for (var i = 1; i < numPeriod; i++) {
        // generate data
        if (currentAmount==0) {
          currentAmount = parseFloat(pv)+0;
        }
        currentAmount = currentAmount + parseFloat(pmt);
        currentAmount = (currentAmount * (1 + rate / 100));
        console.log(currentAmount);
        array.push(currentAmount);

        // generate labels
        // if
        if (typePeriod == "Annual") {
          currentDate.add(1, 'y');
          labelarray.push(currentDate.format("MMM YY"));
        }
        else if (typePeriod == "Monthly") {
          currentDate.add(1, 'M');
          labelarray.push(currentDate.format("MMM YY"));
        }

      }
      $scope.data[0] = array;
      $scope.labels = labelarray;
      return array;
    }

    $scope.labels = ["Current Time"];
    $scope.series = ["Series A"];
    $scope.data = [
      [0, 1]
    ];
    // $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    // $scope.series = ['Series A', 'Series B'];
    // $scope.data = [
    //   [65, 59, 80, 81, 56, 55, 40],
    //   [28, 48, 40, 19, 86, 27, 90]
    // ];
    $scope.onClick = function(points, evt) {
      console.log(points, evt);
    };
    // $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    // $scope.options = {
    //   scales: {
    //     yAxes: [
    //       {
    //         id: 'y-axis-1',
    //         type: 'linear',
    //         display: true,
    //         position: 'left'
    //       },
    //       {
    //         id: 'y-axis-2',
    //         type: 'linear',
    //         display: true,
    //         position: 'right'
    //       }
    //     ]
    //   }
    // };
  });

}
