<?php
	$Subject="Заявка с сайта";
    $from = "noreply". $HTTP_HOST;

	$to = "<info@info.ru>,<info@info.ru>";
	$headers  = "MIME-Version: 1.0\r\n";
	$headers .= "Content-type: text/html; charset=utf-8 \r\n";
	$headers .= "From: noreply <".$from.">\r\n";

	$msg = '

		<p>	Имя: '.$_POST['name'].'</p>
		<p>	Телефон: '.$_POST['tel'].'</p>
		<p>	Количество: '.$_POST['number'].'</p>
		<p>	Откуда: '.$_POST['form_zakaz_where'].'</p>



	';

	if(mail($to, $Subject, $msg, $headers)) {
        header("Location: success.html");
	}	else	{
		echo "Error : Email has not been sent.";
	}
?>
