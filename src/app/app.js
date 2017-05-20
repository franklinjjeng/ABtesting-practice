var blueball = 'https://img.clipartfest.com/4a1780a63f0c67b9d33a474555fa28da_blue-ball-image-blue-ball-clipart_2400-2400.png';
var redball = 'https://img.clipartfest.com/c136f711624671ef0876f2edec9980ae_red-ball-image-red-ball-box-clipart_2400-2400.png';

var ABsplit = function() {
  var color = $.cookie('redVSblue');
  if (color) {
    console.log('cookie found', color);
  } else {
    console.log('no cookie found, assigning color');
    var random = Math.random();
    if (random > 0.5) {
      color = 'red';
    } else {
      color = 'blue';
    }

  }

  $.cookie('redVSblue', color, { expires: 1, path: '/' });
  display(color);
  return;
}

var display = function(color) {

  if (color === 'red') {
    $('body').append('<img style="width: 20%" src="' + redball + '">');
  } else if (color === 'blue') {
    $('body').append('<img style="width: 20%" src="' + blueball + '">');
  }

}



ABsplit();

