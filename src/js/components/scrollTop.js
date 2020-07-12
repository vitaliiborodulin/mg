var $links = $('.header__navigation a');
var menu = $('.header__menu');

    $links.on('click', function(e){
      
      if (menu.hasClass('header__menu--open')){
        $('.burger').toggleClass('burger--close');
        menu.toggleClass('header__menu--open');
      }

    
    });

$('body').on('click', '[href*="#"]', function(e){
    var fixed_offset = 85;
    $('html,body').stop().animate({ 
      scrollTop: $(this.hash).offset().top - fixed_offset 
    }, 300);
  e.preventDefault();
});