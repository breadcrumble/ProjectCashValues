
  angular.module("app", ["chart.js"]).controller("AppController", function($scope) {
    $scope.pvToFv = true;
    $scope.cashValue = [];
    $scope.togglePvToFv = function() {
      $scope.pvToFv = !$scope.pvToFv;
    }
    $scope.validationCalculation = function (fv, pv, pmt, rate, numPeriod, typePeriod, isPvToFV) {
      if (isPvToFV==false) {
        return numberValidation(fv) && numberValidation(pmt) && numberValidation(rate) && numberValidation(numPeriod) && validationTypePeriod(typePeriod);

      } else if (isPvToFV==true) {
        return numberValidation(pv) && numberValidation(pmt) && numberValidation(rate) && numberValidation(numPeriod) && validationTypePeriod(typePeriod);
      }
    };
    $scope.validationDividend = function (rate, startPeriod, payoutMode) {
      if ($scope.cashValue.length !=0 ) {
        return numberValidation(rate) && numberValidation(startPeriod) && validationTypePeriod(payoutMode);
      } else {
        return false;
      }
    };
    var validationTypePeriod = function(string) {
      if (string == "" || !string) {
        return false;
      } else {
        return true;
      }
    };
    $scope.validationTypePeriod = validationTypePeriod;
    var numberValidation = function(string) {
      if (!isNaN(string)) {
        if (string != 0) {
          return true;

        }
      } else {
        return false;
      }

    };

    var validationPayoutPeriod = function (startPeriod, numPeriod) {
      // console.log(startPeriod, numPeriod);
      if (parseFloat(startPeriod) < parseFloat(numPeriod)) {
        return true;
      } else {
        return false;
      }
    }
    $scope.validationPayoutPeriod = validationPayoutPeriod;
    $scope.numberValidation = numberValidation;
    $scope.calculateDividends = function(rate, start, payoutMode){
      var numPeriod = $scope.cashValue.length;
      if ( numPeriod != 0) {

        var array = [];

        for (var i = 1; i < start; i++) {
          array.push(0);
        }
        console.log(array);
        for (var i = start-1; i < numPeriod; i++) {
          array.push(Math.round($scope.cashValue[i]*rate/100));
        }
        console.log(array);
        if (payoutMode=="reinvest") {
          // create another line chart
          $scope.data[1] = array;
        } else if (payoutMode=="payout") {
          // create a bar chart
          $scope.data[1] = array;
        }



      }



    };
    $scope.calculatePVfromFV = function(fv, pmt, rate, numPeriod, typePeriod) {
      var array = [],
      labelarray = [],
      currentAmount = 0;

      console.log(fv, pmt, rate, numPeriod, typePeriod);
      array.push(fv);

      var currentDate = moment();
      labelarray.push(currentDate.format("MMM YY"));

      for (var i = 1; i < numPeriod; i++) {
        // generate data
        if (currentAmount==0) {
          currentAmount = parseFloat(fv)+0;
        }

        // if
        if (typePeriod == "Annual") {
          currentAmount = (currentAmount / (1 + rate / 100));
          currentAmount = currentAmount - parseFloat(pmt);
          console.log(currentAmount);
          array.push(Math.round(currentAmount));
        }
        else if (typePeriod == "Monthly") {
          for (var j = 0; j < 12; j++) {

            currentAmount = (currentAmount / (1 + rate / 100));
            currentAmount = currentAmount - parseFloat(pmt);
          }
          console.log(currentAmount);
          array.push(Math.round(currentAmount));

        }
        // generate labels
        currentDate.add(1, 'y');
        labelarray.push(currentDate.format("MMM YY"));

      }
      array.reverse();
      $scope.cashValue = array;
      $scope.data[0] = array;
      $scope.labels = labelarray;
      return array;
    };
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

        // if
        if (typePeriod == "Annual") {
          currentAmount = currentAmount + parseFloat(pmt);
          currentAmount = (currentAmount * (1 + rate / 100));
          console.log(currentAmount);
          array.push(Math.round(currentAmount));
        }
        else if (typePeriod == "Monthly") {
          for (var j = 0; j < 12; j++) {

            currentAmount = currentAmount + parseFloat(pmt);
            currentAmount = (currentAmount * (1 + rate / 100));
          }
          console.log(currentAmount);
          array.push(Math.round(currentAmount));

        }
        // generate labels
        currentDate.add(1, 'y');
        labelarray.push(currentDate.format("MMM YY"));

      }
      $scope.cashValue = array;
      $scope.data[0] = array;
      $scope.labels = labelarray;
      return array;
    };

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
    $scope.datasetOverride = [
      {
        label: "Total Cash Value",
        borderWidth: 3,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        type: 'line'
      },
  {
    label: "Dividend Payout Per Year",
    borderWidth: 1,
    type: 'bar'
  }

];
$scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
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
