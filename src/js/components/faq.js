$('.faq__answer:first').show()
$('.faq__question:first').addClass('faq__question--open');

$('.faq__question').on('click', function(){
    var answer = $(this).next();
    $('.faq__question').removeClass('faq__question--open');
    $(this).addClass('faq__question--open');

    $('.faq__answer:visible').not(answer).hide(200);
    answer.slideDown(200);
})
