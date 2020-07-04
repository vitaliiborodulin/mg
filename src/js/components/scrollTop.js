var $links = $('.header__navigation a');
var menu = $('.header__navigation');

    $links.on('click', function(e){
      e.preventDefault();

      if (menu.hasClass('header__navigation--open')){
        $('.burger').toggleClass('burger--close');
        menu.toggleClass('header__navigation--open');
      }

      $links.removeClass('active').filter(this).addClass('active');

      var link = $(this);
      var $target = $(link.attr('href'));

      if($target.length > 0){
        $('html, body').animate({
          scrollTop: $target.offset().top - 60
        }, 700);
      }

    });