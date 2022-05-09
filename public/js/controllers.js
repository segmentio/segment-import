'use strict';

segImport.controller('mainController', ['$scope', '$http',
  function($scope, $http)
{
  var csv = $scope.csv = {};

  csv.array = []; // These are the rows.
  csv.JSON = []; // JSON object
  csv.JSONString = '';
  csv.writeKey = '';

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

    var headers = this.array[0];
    this.JSON.length = 0;

    for (var i = 1; i < this.array.length; i ++) {
      var obj = {};
      var currentLine = this.array[i];
      for (var j = 0; j < headers.length; j ++) {
        // Keep Nulls, ints and floats 
        switch (true) {
          case currentLine[j] == 'null':
            currentLine[j] = null
            break
          case /^[0-9]+$/.test(currentLine[j]):
            currentLine[j] = parseInt(currentLine[j])
            break
          case /^[0-9]*\.[0-9]+$/.test(currentLine[j]):
            currentLine[j] = parseFloat(currentLine[j])
            break
        }
        if (headers[j].indexOf('.') > 0) {
          var prefix = headers[j].substring(0, headers[j].indexOf('.'));
          var suffix = headers[j].substring(headers[j].indexOf('.') + 1);
          if (!obj[prefix])
            obj[prefix] = {};  
          obj[prefix][suffix] = currentLine[j] ;
        } else {
          obj[headers[j]] = currentLine[j];
        }
      }
      this.JSON.push(obj);
    }
    this.JSONString = JSON.stringify(this.JSON, null, 2);
  };

  // Post csv.JSON to end point.
  csv.importJSON = function importJSON() {
    console.log(this.JSON);
    $http.post('/api/import', {batch: this.JSON, writeKey: this.writeKey})
    .success(function(err, data) {
      console.log(err);
      console.log(data);
    })
    .error(function(err, data) {
      console.log(err);
      console.log(data);
    });
  };
}]);