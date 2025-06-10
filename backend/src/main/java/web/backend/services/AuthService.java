    package web.backend.services;

    import jakarta.servlet.http.HttpServletResponse;
    import jakarta.transaction.Transactional;
    import lombok.RequiredArgsConstructor;
    import org.springframework.stereotype.Service;
    import web.backend.dto.*;
    import web.backend.models.Token;
    import web.backend.models.User;

    import java.util.Date;

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
    //    login user
        public AuthResponse login(LoginRequest request,HttpServletResponse response){
            User user=userService.findUserByEmail(request.getEmail());
            String accessToken=tokenService.generateAccessToken(user.getEmail());
            String refreshToken=tokenService.generateRefreshToken(user.getEmail());
            Token token=tokenService.getOrCreateRefreshToken(user,refreshToken);
            cookieService.addTokenToCookie(response,token.getRefreshToken());
            return new AuthResponse(user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getRole(),
                    accessToken,
                    refreshToken);
        }
    //   token refresh
        @Transactional
        public AuthResponse refresh(String refreshToken,HttpServletResponse response){
            if(refreshToken==null || refreshToken.isEmpty()){
                throw new RuntimeException("Token is empty!");
            }
            if (!tokenService.validateToken(refreshToken)){
                throw new RuntimeException("Invalid token");
            }
            String email;
            try {
                email=tokenService.extractEmail(refreshToken);
            } catch (RuntimeException e) {
                throw new RuntimeException(e);
            }
            if(email==null || email.isEmpty()){
                throw new RuntimeException("Invalid token");
            }
            User user=userService.findUserByEmail(email);
            Token storedToken=tokenService.findTokenByUser(user);
            if(!storedToken.getUser().getId().equals(user.getId())){
                throw new RuntimeException("Token does not belong to user");
            }
            if (storedToken.getExpiryDate().before(new Date())){
                throw new RuntimeException("Token is expired");
            }
            String accessToken=tokenService.generateAccessToken(user.getEmail());
            String newRefreshToken=tokenService.generateRefreshToken(user.getEmail());
            tokenService.getOrCreateRefreshToken(user,newRefreshToken);
            cookieService.addTokenToCookie(response,newRefreshToken);
            return new AuthResponse(user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getRole(),
                    accessToken,
                    newRefreshToken);
        }
        @Transactional
        public void logout(String refreshToken,HttpServletResponse response){
            tokenService.deleteToken(refreshToken);
            cookieService.clearCookie(response);
        }
        //forgot password
        @Transactional
        public String forgotPassword(ForgotPasswordRequest request){
            User user=userService.findUserByEmail(request.getEmail());
            String token=tokenService.generateAccessToken(user.getEmail());
            mailService.sendMail(user.getEmail(),"Reset Password","http://localhost:5173/reset-password?token="+token);
            return "Rest password link sent to your email!";
        }
//        reset password
        @Transactional
        public String resetPassword(ResetPasswordRequest request){
            boolean userPayload=tokenService.validateToken(request.getToken());
            if (!userPayload){
                throw new RuntimeException("Invalid token");
            }
            Token token=tokenService.findByRefreshT(request.getToken());
            User user=token.getUser();
            userService.updatePassword(user,request.getPassword());
            return "Password updated successfully";
        }
    }
