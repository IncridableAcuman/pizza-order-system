package web.backend.services;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
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
    @Transactional
    public AuthResponse register(RegisterRequest request, HttpServletResponse response){

            User user=userService.createUser(request);
            String accessToken=tokenService.generateAccessToken(user.getEmail());
            String refreshToken=tokenService.generateRefreshToken(user.getEmail());
            tokenService.createToken(user,refreshToken);
            cookieService.addTokenToCookie(response,refreshToken);
            mailService.sendMail(user.getEmail(),"Hi There","Your account join to us");
            return new AuthResponse(user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getRole(),
                    accessToken,
                    refreshToken);
    }
}
