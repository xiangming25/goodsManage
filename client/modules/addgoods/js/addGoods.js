;(function() {
  require(['/vendor/main.js'], function() {
    require(['jquery', 'network'], function($, network) {
      $('#submitBtn').on('click', submit);


      function submit() {
        var name = $('#name').val(),
            unit = $('#unit').val(),
            inPrice = $('#inPrice').val(),
            image = $('#image').val(),
            outPrice = $('#outPrice').val(),
            type = $('#type').val(),
            remainder = $('#remainder').val(),
            isShow = $('input[name=isShow]:checked').val();

        var params = {
          name: name,
          unit: unit,
          image: image,
          inPrice: inPrice,
          outPrice: outPrice,
          type: type,
          remainder: remainder,
          isShow: isShow
        };
        console.log('params:================',params);
        var response = network('POST', '/api/goods/add', params);
        response.then(function(data) {
          console.log("promise data: ---",data);
        })
        .catch(function(errInfos) {
          console.log('errInfos:----',errInfos);
        });
      }
    });
  });
})();
