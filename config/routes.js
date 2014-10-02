'use strict';

(function() {

  /**
   * Import helpers ============================================================
   */
  var Segment = require('../app/helpers/segment.js');
  var assert = require('http-assert');
  var ok = require('assert');

  // Public functions. =========================================================
  module.exports = function(app) {
    // API routes ==============================================================
    app.post('/api/import', function(req, res) {
      // Send request to Segment.
      // Need writeKey
      var writeKey = req.body.writeKey;
      var batch = {
        batch: req.body.batch
      };

      Segment.batchImport(writeKey, batch, function(err, http, body) {
        if (err)
          res.send(err, 400);

        console.log(body);

        res.send(body, 200);
      });
    });

    // Application routes ======================================================
    app.get('/*', function(req, res) {
      res.sendfile('index.html', {'root': './public/views/'});
    });
  };

}());