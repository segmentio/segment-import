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

  /**
   * Assigns value to object, creates nested properties in obj in case prop has "." in it.
   * E.g. var obj = {}; assignValue(obj, 'some.prop_name', 'test') =>
   * obj.some.prop_name === 'test'
   * @param {Object} obj
   * @param {String} prop
   * @param {any} value
   */
  csv.assignValue = function assignValue(obj, prop, value) {
    var nestedProps = prop.split('.');
    var refObj = obj;
    for (var i = 0; i < nestedProps.length; i++) {
      var nestedProp = nestedProps[i];
      if (i === nestedProps.length - 1) {
        refObj[nestedProp] = value;
      } else {
        if (!refObj.hasOwnProperty(nestedProp))
          refObj[nestedProp] = {};
        
        refObj = refObj[nestedProp];
      }
    }
  };

  /**
   * Converts a value found in the csv string to the corresponding type:
   * "some string" => "some string"
   * "TRUE" => true
   * "FALSE" => false
   * "1234" => 1234
   * @param {String} rawValue
   */
  csv.convertValue = function convertValue(rawValue) {
    if (!rawValue)
      return '';

    if (rawValue.toLowerCase() === 'true')
      return true;

    if (rawValue.toLowerCase() === 'false')
      return false;

    return isNaN(rawValue) ? rawValue : (+rawValue);
  };

  // Convert csv.array to csv.JSON.
  csv.arrayToJSON = function arrayToJSON() {

    var headers = this.array[0];
    this.JSON.length = 0;

    for (var i = 1; i < this.array.length; i ++) {
      var obj = {};
      var currentLine = this.array[i];
      for (var j = 0; j < headers.length; j ++) {
        var value = csv.convertValue(currentLine[j]);
        csv.assignValue(obj, headers[j], value);
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