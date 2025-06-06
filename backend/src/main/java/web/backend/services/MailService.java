package web.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    @Autowired
     JavaMailSender javaMailSender;

    public void sendMail(String to,String subText,String text){
        SimpleMailMessage message=new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subText);
        message.setText(text);
        javaMailSender.send(message);
    }
}
