package web.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.backend.models.User;

public interface UserRepository extends JpaRepository<User,Long> {
}
