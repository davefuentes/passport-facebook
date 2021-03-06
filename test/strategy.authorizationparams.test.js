var chai = require('chai')
  , FacebookStrategy = require('../lib/strategy');


describe('Strategy', function() {
    
  var strategy = new FacebookStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    },
    function() {});
  
  describe('handling a request to be redirected with display param', function() {
    var url;
  
    before(function(done) {
      chai.passport(strategy)
        .redirect(function(u) {
          url = u;
          done();
        })
        .req(function(req) {
        })
        .authenticate({ display: 'mobile' });
    });
  
    it('should be redirected', function() {
      expect(url).to.equal('https://www.facebook.com/dialog/oauth?display=mobile&response_type=code&redirect_uri=&client_id=ABC123&type=web_server');
    });
  });
  
  describe('handling a request to be redirected with reauthorization params', function() {
    var url;
  
    before(function(done) {
      chai.passport(strategy)
        .redirect(function(u) {
          url = u;
          done();
        })
        .req(function(req) {
        })
        .authenticate({ authType: 'reauthenticate', authNonce: 'foo123' });
    });
  
    it('should be redirected', function() {
      expect(url).to.equal('https://www.facebook.com/dialog/oauth?auth_type=reauthenticate&auth_nonce=foo123&response_type=code&redirect_uri=&client_id=ABC123&type=web_server');
    });
  });
  
});
