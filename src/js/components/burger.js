$('.burger').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('burger--close');
    $('.header__menu').toggleClass('header__menu--open');
  });