// $('.faq__answer:first').show()
// $('.faq__question:first').addClass('faq__question--open');

$('.faq__question').on('click', function(){
    var question = $(this);
    var answer = $(this).next();

    $('.faq__question').not(question).removeClass('faq__question--open');
    question.toggleClass('faq__question--open');

    $('.faq__answer:visible').not(answer).slideUp(200);
    answer.slideToggle(200);

})
