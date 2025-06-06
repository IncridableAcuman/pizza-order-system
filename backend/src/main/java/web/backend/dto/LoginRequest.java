package web.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank(message = "Email is required!")
    @Email
    private String email;

    @NotBlank(message = "Password is required!")
    @Size(min = 8,max = 1024,message = "Password must be between 8 and 1024 characters")
    private String password;

}
