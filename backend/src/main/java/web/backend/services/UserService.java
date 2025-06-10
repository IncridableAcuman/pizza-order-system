package web.backend.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import web.backend.dto.RegisterRequest;
import web.backend.enums.Role;
import web.backend.models.User;
import web.backend.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User createUser(RegisterRequest request){
        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new RuntimeException("User already exist");
        }
        User user=new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.ADMIN);
        return userRepository.save(user);
    }
    @Transactional
    public User findUserByEmail(String email){
        return userRepository.findByEmail(email)
                .orElseThrow(()->new RuntimeException("User not found by email!"));
    }
    @Transactional
    public User findUserByUsername(String username){
        return userRepository.findByUsername(username).
                orElseThrow(()->new RuntimeException("User not found by username!"));
    }
    @Transactional
    public User updatePassword(String password){
        User user=new User();
        user.setPassword(passwordEncoder.encode(password));
        return userRepository.save(user);
    }
}
