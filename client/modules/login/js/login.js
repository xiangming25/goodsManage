;(function() {
  require(['/vendor/main.js'], function() {
    require(['jquery'], function($) {
      $('#submitBtn').on('click', submit);
      $('#getInfo').on('click',testGetInfo);


      function submit() {
        var username = $('#username').val(),
            password = $('#password').val();

        var params = {
          name: username,
          password: password,
        };
        console.log('params:====',params);
        $.post('/user/check', params,function(response) {
          console.log('response:----',response);
          localStorage.token = response.token;
        });
      }

      function testGetInfo() {
        $.ajax({
          type: 'GET',
          url: '/user/all',
          beforeSend: function(xhr) {
            xhr.setRequestHeader('token', localStorage.token);
          },
          success: function(data) {
            console.log('data:-===',data);
          }
        })
      }
    });
  });
})();
