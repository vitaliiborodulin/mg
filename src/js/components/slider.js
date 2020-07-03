$('.team__list').owlCarousel({
    loop:true,
    nav:true,
    margin:10,
    dots: true,
    responsiveClass:true,
    responsive:{
        0:{
            items:1
        },
        768:{
            items:3,
            dots: false
        }
    }
  })

  $('.sert__list').owlCarousel({
    loop:true,
    nav:true,
    margin:10,
    dots: true,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
        },
        768:{
            items:4,
            dots: false
        }
    }
  })