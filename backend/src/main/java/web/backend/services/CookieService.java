package web.backend.services;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

@Service
public class CookieService {

    public void addTokenToCookie(HttpServletResponse response,String refreshToken){
        ResponseCookie cookie=ResponseCookie.from("token",refreshToken)
                .httpOnly(true)
                .secure(false)
                .maxAge(604800)
                .path("/")
                .build();
        response.addHeader("Set-Cookie",cookie.toString());
    }

    public void clearCookie(HttpServletResponse response){
        Cookie cookie=new Cookie("token",null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);
    }
}
