$('.about__list--mob').owlCarousel({
    loop:true,
    nav:true,
    margin:10,
    dots: true,
    items:1
})

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
        770:{
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
        770:{
            items:3,
            dots: false
        }
    }
})

