'use strict';

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
        var cleanedFirstLine = firstLine.toLowerCase().replace(/\s+/g, '_');
        csvString = csvString.replace(firstLine, cleanedFirstLine);

        console.log(csvString);

        // Parse csv.
        csvFile = $.csv.toObjects(csvString);

        scope.$apply(function() {
          for (var i = 0; i < csvFile.length; i++) {
            scope.csv.addRow(csvFile[i]);
          };
        });
      };

      reader.readAsText(file);
    } else {
      fileDisplayArea.innerText = "File not supported!"
    };
  });
}