;(function() {
  require(['/vendor/main.js'], function() {
    require(['jquery', 'network'], function($, network) {
      $('#submitBtn').on('click', submit);
      $('#getInfo').on('click',testGetInfo);


      function submit() {
        var username = $('#username').val(),
            password = $('#password').val();

        var params = {
          name: username,
          password: password,
        };
        var response = network('POST', '/api/signin', params);
        response.then(function(data) {
          console.log("promise data: ---",data);
        })
        .catch(function(errInfos) {
          console.log('errInfos:----',errInfos);
        });
      }

      function testGetInfo() {
        var response = network('GET','/api/userInfo');
        response.then(function(data) {
          console.log('getInfoData:-------------',data);
        })
        .catch(function(err) {
          console.log('err:----',err);
        });
      }
    });
  });
})();
