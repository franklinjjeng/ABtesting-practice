var blueball = 'https://img.clipartfest.com/4a1780a63f0c67b9d33a474555fa28da_blue-ball-image-blue-ball-clipart_2400-2400.png';
var redball = 'https://img.clipartfest.com/c136f711624671ef0876f2edec9980ae_red-ball-image-red-ball-box-clipart_2400-2400.png';

var ABsplit = function() {
  var random = Math.random();
  if (random > 0.5) {
    $('body').append('<img style="width: 20%" src="' + redball + '">');
  } else {
    $('body').append('<img style="width: 20%" src="' + blueball + '">');
  }

  return;
}


ABsplit();


