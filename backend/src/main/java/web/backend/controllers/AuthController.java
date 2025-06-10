package web.backend.controllers;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.backend.dto.*;
import web.backend.services.AuthService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request, HttpServletResponse response){
        return ResponseEntity.ok(authService.register(request,response));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request,HttpServletResponse response){
        return ResponseEntity.ok(authService.login(request,response));
    }

    @GetMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestHeader(name = "Authorization",required = false) String authorization,HttpServletResponse response){
        if (authorization==null || !authorization.startsWith("Bearer ")){
            throw new RuntimeException("Invalid token");
        }
        String token=authorization.substring(7);
        return ResponseEntity.ok(authService.refresh(token,response));
    }
    @PostMapping("/logout")
    public ResponseEntity<String> logout(@CookieValue(name = "token") String refreshToken,HttpServletResponse response){
        authService.logout(refreshToken,response);
        return ResponseEntity.ok("User logged out");
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request){
        return ResponseEntity.ok(authService.forgotPassword(request));
    }
    @PutMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@Valid @RequestBody ResetPasswordRequest request){
        return ResponseEntity.ok(authService.resetPassword(request));
    }
}
