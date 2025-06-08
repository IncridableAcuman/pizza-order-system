package web.backend.services;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import web.backend.dto.AuthResponse;
import web.backend.dto.RegisterRequest;
import web.backend.models.User;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserService userService;
    private final TokenService tokenService;
    private final MailService mailService;
    private final CookieService cookieService;

//    user register
    public AuthResponse register(RegisterRequest request, HttpServletResponse response){
        try {
            User user=userService.createUser(request);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
}
