angular.module('F1FeederApp.services', [])
  .factory('ergastAPIservice', function($http) {

    var ergastAPI = {};

    ergastAPI.getDrivers = function() {
      return $http({
        method: 'JSONP', 
        url: 'http://eergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK'
      });
    }

    ergastAPI.getDriverDetails = function(id) {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/2013/drivers/'+ id +'/driverStandings.json?callback=JSON_CALLBACK'
      });
    }

    ergastAPI.getDriverRaces = function(id) {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/2013/drivers/'+ id +'/results.json?callback=JSON_CALLBACK'
      });
    }

    ergastAPI.login = function(user,password) {
      console.log("in service login");
      var key = CryptoJS.enc.Hex.parse('553246736447566b5831414273664835396647324f494459505a536a5939774c')
    //  var key =                      'U2FsdGVkX1ABsfH59fG2OIDYPZSjY9wL';
      //"encryption_key"
      //var iv  = "%032d" % 0;
      var iv  = CryptoJS.enc.Hex.parse('0000000000000000000000000000000000000000000000000000000000000000');
      
      //var iv  = CryptoJS.enc.Hex.parse('101112131415161718191a1b1c1d1e1f');
    //  var prefix = (new Date).getTime() / 1000;
    //  prefix = Math.round(prefix);
      var prefix =1401093435 ;
      var encrypted = CryptoJS.AES.encrypt(prefix + ".testing123", key, { iv: iv });
      b64 = atob(encrypted.toString());
      console.log(b64);
      console.log("key is " + encrypted.key.words.toString(16));
      console.log("encrypted is " + encrypted.toString());     
      var base64 = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
      console.log("iv is" + iv);

      
      return $http({
        method:'JSONP',
	//data: { 'name' : 'auto_test_csmgr' , 'ios_password':'hnsRMBucRa8Rqr9Bjb1efwXSAa4YHJx9dVf7mactNLM='},
        url: 'http://localhost:8082/api/login',
        headers:{
        'Accept':'application/json',
        'Content-Type':'application/json; charset=utf-8',
        'Access-Control-Request-Headers': 'X-Requested-With, content-type, accept, origin, withcredentials'
        }
      });
     /* return $http({
        method:'GET',
        url: 'http://127.0.0.1:8081/api/customers',
	data: {'page' :'2'}
      });*/
    }
    return ergastAPI;
  });
