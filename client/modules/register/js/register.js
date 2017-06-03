;(function() {
  require(['/vendor/main.js'], function() {
    require(['jquery'], function($) {
      $('#submitBtn').on('click', submit);


      function submit() {
        var username = $('#username').val(),
            password = $('#password').val(),
            telphone = $('#telphone').val();

        var params = {
          name: username,
          password: password,
          telphone: telphone
        };
        console.log('params:====',params);
        $.post('/user/addUser', params,function(response) {
          console.log('response:----',response);
        });
      }
    });
  })
})();
