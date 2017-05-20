var blueball = 'https://img.clipartfest.com/4a1780a63f0c67b9d33a474555fa28da_blue-ball-image-blue-ball-clipart_2400-2400.png';
var redball = 'https://img.clipartfest.com/c136f711624671ef0876f2edec9980ae_red-ball-image-red-ball-box-clipart_2400-2400.png';
var url = 'http://127.0.0.1:3000/';

var ABsplit = function() {
  var color;

  color = $.cookie('redVSblue');
  if (color) {
    console.log('cookie found', color)
  } else {
    console.log('no cookie found, assigning color');
    var random = Math.random();

    if (random > 0.5) {
      color = 'red';
    } else {
      color = 'blue';
    }

    $.cookie('id', random.toString(36).slice(2, 9));
    $.cookie('redVSblue', color, { expires: 1, path: '/' });
    $.cookie('red', 0);
    $.cookie('blue', 0);
  }

  display(color);
  increment(color);
  updateRecords($.cookie());

  return;
}

var display = function(color) {

  if (color === 'red') {
    $('body').append('<img style="width: 20%" src="' + redball + '">');
  } else if (color === 'blue') {
    $('body').append('<img style="width: 20%" src="' + blueball + '">');
  }

}

var increment = function(color) {
  var count = $.cookie(color);
  count++;
  $.cookie(color, count);
}

var updateRecords = function(data) {
  $.ajax({
    type: 'POST',
    url: url + 'api/updateRecord',
    data: {data: data},
    dataType: 'json',
    success: function(res) {
      console.log('post request success', res);
    }
  });
}


ABsplit();

