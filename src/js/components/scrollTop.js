var $links = $('.header__menu .header__item a');
var menu = $('.header__menu');

    $links.on('click', function(e){
      e.preventDefault();

      if (menu.hasClass('header__menu--open')){
        $('.burger').toggleClass('burger--close');
        menu.toggleClass('header__menu--open');
      }

      $links.removeClass('active').filter(this).addClass('active');

      var link = $(this);
      var $target = $(link.attr('href'));

      if($target.length > 0){
        $('html, body').animate({
          scrollTop: $target.offset().top
        }, 700);
      }

    });
