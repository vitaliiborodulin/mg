$('.burger').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('burger--close');
    $('.header__navigation').toggleClass('header__navigation--open');
  });