<?php  

namespace App\Helpers;

class MailSender {

    public static function send($to, $subject, $message) {

      $headers = 'From: info@dtg.digiants.agency' . "\r\n" .
          'Reply-To: info@dtg.digiants.agency' . "\r\n" .
          'X-Mailer: PHP/' . phpversion();

      $status = mail($to, $subject, $message, $headers);
      
    }
}