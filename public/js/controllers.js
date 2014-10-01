'use strict';

segImport.controller('mainController', ['$scope', '$http',
  function($scope, $http)
{
  var csv = $scope.csv = {};

  csv.array = []; // These are the rows.
  csv.JSON = []; // JSON object
  csv.JSONString = '';

  // Take csv string and turn it into array.
  csv.addArray = function addArray(csv) {
    csv.forEach(function(row) {
      this.array.push(row);
    }.bind(this));
    this.arrayToJSON();
  };

  // Empty rows in csv.array.
  csv.removeAll = function removeAll() {
    this.array.length = 0;
  };

  // Convert csv.array to csv.JSON.
  csv.arrayToJSON = function arrayToJSON() {

    console.log(this.array);

    var headers = this.array[0];
    this.JSON.length = 0;

    for (var i = 1; i < this.array.length; i ++) {
      var obj = {};
      var currentLine = this.array[i];
      for (var j = 0; j < headers.length; j ++) {
        obj[headers[j]] = currentLine[j];
      }
      this.JSON.push(obj);
    }

    this.JSONString = JSON.stringify(this.JSON, null, 2);
  };

  // Post csv.JSON to end point.
  csv.importJSON = function importJSON() {
    // arrayToJSON.
    $http.post('/api/import', {load: this.JSON})
    .success(function(err, data) {
    })
    .error(function(err, data) {
    });
  };
}]);