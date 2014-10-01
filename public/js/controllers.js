'use strict';

segImport.controller('mainController', ['$scope', '$http',
  function($scope, $http)
{
  var csv = $scope.csv = {};

  csv.array = []; // These are the rows.
  csv.JSON = {}; // JSON object

  csv.addRow = function addRow() {
    // Add a row to csv.array.
  };

  csv.removeAll = function removeAll() {
    // Empty rows in csv.array.
  };

  csv.toJSON = function toJSON() {
    // csv.array to csv.JSON object
  };
}]);