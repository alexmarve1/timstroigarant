<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMAiler\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru' 'phpmailer/language/');
    $mail->IsHTML(true);

    $mail->setFrom('timstroigarant.ru', 'Тимстройгарант');
    $mail->addAddress('vampir4eg1989@gmail.com');
    $mail->Subject = "Вам пришла заявка на оказание услуг";

    $body = '<h1>Новая заявка на оказание услуг</h1>';

    if(trim(!empty($_POST['name']))){
      $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['email']))){
      $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
    }
    if(trim(!empty($_POST['phone']))){
      $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
    }
    if(trim(!empty($_POST['message']))){
      $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
    }


    $mail->Body=$body;

    if (!$mail>send()) {
      $message = 'Ошибка';
    }else {
      $message = 'Данные отправлены!';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
    ?>