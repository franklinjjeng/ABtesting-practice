var blueball = 'https://img.clipartfest.com/4a1780a63f0c67b9d33a474555fa28da_blue-ball-image-blue-ball-clipart_2400-2400.png';
var redball = 'https://img.clipartfest.com/c136f711624671ef0876f2edec9980ae_red-ball-image-red-ball-box-clipart_2400-2400.png';
var url = 'http://127.0.0.1:3000/';
var page = 'home';
var records;

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

  displayBall(color);
  increment(color);
  updateRecords($.cookie());

  return;
}

var displayBall = function(color) {

  if (color === 'red') {
    $('.ball').append('<img src="' + redball + '">');
  } else if (color === 'blue') {
    $('.ball').append('<img src="' + blueball + '">');
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
      records = res;
    }
  });
}

var retrieveRecords = function() {
  $.ajax({
    type: 'GET',
    url: url + 'api/getRecords',
    success: function(res) {
      records = JSON.parse(res);
    }
  });
}

$( ".home-menu" ).click(function() {
  page = 'home';
  $("a").removeClass("selected");
  $( ".home-menu" ).addClass("selected");
  render(page);
});

$( ".report-menu" ).click(function() {
  retrieveRecords();
  page = 'report';
  $("a").removeClass("selected");
  $( ".report-menu" ).addClass("selected");
  render(page);
});

var render = function(page) {
  if (page === 'home') {
    clearPage();
    $('body').append('<div class="ball"></div>');
    ABsplit();
  } else if (page === 'report') {
    clearPage();
    displayReport();
  }
}

var clearPage = function () {
  $('.ball').remove();
  $('.report').remove();
}

var displayReport = function() {
  $('body').append('<div class="report"></div>')
  $('.report:last-child').append('<table class="report-table"></table>');
  $('.report-table').append('<tr class="report-header"></tr>');
  $('.report-header').append('<th>ID</th>');
  $('.report-header').append('<th>Red views</th>');
  $('.report-header').append('<th>Blue views</th>');
  
  for (var key in records) {
    $('.report-table').append('<tr class="report-entry"></tr>');
    $('.report-entry:last-child').append('<th>' + key + '</th>');
    $('.report-entry:last-child').append('<th>' + records[key].red + '</th>');
    $('.report-entry:last-child').append('<th>' + records[key].blue + '</th>');
  }

}




render(page);