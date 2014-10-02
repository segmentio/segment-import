'use strict';

(function() {

  /**
   * Import helpers ============================================================
   */
  var Segment = require('../app/helpers/segment.js');

  // Public functions. =========================================================
  module.exports = function(app) {
    // API routes ==============================================================
    app.post('/api/import', function(req, res) {
      // Send request to Segment.
      // Need writeKey
      var writeKey = req.body.writeKey;
      var batch = {
        batch: req.body.load
      };

      Segment.batchImport(batch, writeKey, function(err, data) {
        if (err)
          console.log(err);

        console.log(data);
        res.send(200);
      });
    });

    // Application routes ======================================================
    app.get('/*', function(req, res) {
      res.sendfile('index.html', {'root': './public/views/'});
    });
  };

}());