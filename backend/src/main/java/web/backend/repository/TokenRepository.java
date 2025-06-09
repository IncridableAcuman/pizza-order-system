package web.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.backend.models.Token;
import web.backend.models.User;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token,Long> {
    Optional<Token> findByUser(User user);
    Optional<Token> findByRefreshToken(String refreshToken);
    void deleteByUser(User user);
}
