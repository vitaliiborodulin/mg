wow = new WOW(
  {
  boxClass:     'wow',      // default
  animateClass: 'animate__animated', // default
  offset:       0,          // default
  mobile:       true,       // default
  live:         true        // default
}
)
wow.init();

$('.advantage__item').addClass('wow animate__rubberBand');
$('.price__header').addClass('wow animate__rubberBand');
$('.hero .banner').addClass('wow animate__backInLeft');
$('.bonus .banner').addClass('wow animate__backInRight');
$('.bonus__btn').addClass('wow animate__rubberBand');
