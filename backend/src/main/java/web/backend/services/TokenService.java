package web.backend.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import web.backend.repository.TokenRepository;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final TokenRepository tokenRepository;
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.access-time}")
    private long accessTime;

    @Value("${jwt.refresh-time}")
    private long refreshTime;

    public Key getSigningKey(){
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(String email){
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+accessTime))
                .signWith(getSigningKey())
                .compact();
    }

    public String generateRefreshToken(String email){
        return Jwts
                .builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+refreshTime))
                .signWith(getSigningKey())
                .compact();
    }

    public boolean validateToken(String refreshToken){
        try {
            Claims claims=Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(refreshToken).getBody();
            return claims.getExpiration().after(new Date());
        } catch (RuntimeException e) {
            return false;
        }
    }

    public String extractEmail(String refreshToken){
        return Jwts
                .parserBuilder()
                .build()
                .parseClaimsJws(refreshToken)
                .getBody()
                .getSubject();
    }
}
