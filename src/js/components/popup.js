$('.popup').on('click', function (e) {
  e.preventDefault();

  var where = $(this).data('target');
  var hidden = $('.popup-form .popup-hidden');
  hidden.attr('value', where);


  $('.popup-mail').show();
  $('body').css('overflow', 'hidden');
});

$('.popup-form__close').on('click', function (e) {
  $('.popup-overlay').hide();
  $('body').css('overflow', 'initial');
});

$('#inspector-instructions').on('click', function (e) {
  e.preventDefault();

  $('.popup-instructions').show();
  $('body').css('overflow', 'hidden');
});

$('#inspector-rules').on('click', function (e) {
  $('.popup-rules').show();
  $('body').css('overflow', 'hidden');
});

$('#inspector-journals').on('click', function (e) {
  $('.popup-journals').show();
  $('body').css('overflow', 'hidden');
});


$(document).mouseup(function (e){ // событие клика по веб-документу
  var div = $(".popup-wrapper"); // тут указываем элемент
  if (!div.is(e.target) // если клик был не по нашему блоку
      && div.has(e.target).length === 0) { // и не по его дочерним элементам
        $('.popup-overlay').hide();
        $('body').css('overflow', 'initial');
  }
});
