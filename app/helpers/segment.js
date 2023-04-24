/**
 * Segment helper library.
 */

(function() {
  var request = require('request');

  module.exports = {
    batchImport: function batchImport(writeKey, batch, path, fn) {
      var auth = {
        user: writeKey || '',
        pass: ''
      };
      var opts = {
        uri: path,
        method: 'POST',
        timeout: 50000,
        followRedirect: true,
        maxRedirects: 10,
        auth: auth,
        body: batch,
        json: true
      };
      request(opts, fn);
    }
  };

}());
