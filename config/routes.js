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
      var tracker = req.body.tracker;

      if (tracker == 'Rudderstack') {
        var path = 'https://rudder.iubenda.com/v1/batch'
      } else {
        var path = 'events.eu1.segmentapis.com/v1'
      };

      Segment.batchImport(writeKey, batch, path, function(err, http, body) {
        if (err)
          res.send(err, 400);

          res.send(body, 200);
      });
    });

    // Application routes ======================================================
    app.get('/*', function(req, res) {
      res.sendfile('index.html', {'root': './public/views/'});
    });
  };

}());