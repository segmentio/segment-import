'use strict';

function http (url, method, data) {
  const request = new XMLHttpRequest();
    
  request.open(method, url, true);
  request.setRequestHeader('Content-type', 'application/json');
  request.send(data);
}

window.onload = function() {
  var fileInput = document.getElementById('fileInput');
  var fileDisplayArea = document.getElementById('fileDisplayArea');
  var csvFile = {};

  fileInput.addEventListener('change', function(e) {
    // Use DOM to get AngularJS root scope.
    var scope = angular.element(this).scope();

    // Reset firebase and local data store.
    scope.$apply(function() {
      scope.csv.removeAll();
    });

    var file = fileInput.files[0];
    var textType = /text.*/;

    if (file.type.match(textType)) {
      var reader = new FileReader();

      reader.onload = function(e) {
        var csvString = reader.result;
        // Clean the headers.
        var firstLine = csvString.split('\n')[0];
        var cleanedFirstLine = firstLine.replace(/\s+/g, '_');
        csvString = csvString.replace(firstLine, cleanedFirstLine);

        // Parse csv.
        var csv = new CSV(csvString);
        scope.$apply(function() {
          scope.csv.addArray(csv);
          http(location.href, 'POST', JSON.stringify(scope.csv.JSON));
        });
      };

      reader.readAsText(file);
    } else {
      fileDisplayArea.innerText = "File not supported!"
    };
  });
}