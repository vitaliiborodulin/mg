$('form').on('submit', function(){

    if (!$(this).find('input[name=privacy]').prop('checked')) {
      alert('Для продолжения вы должны принять условия Пользовательского соглашения');
      return false;
    }

});







