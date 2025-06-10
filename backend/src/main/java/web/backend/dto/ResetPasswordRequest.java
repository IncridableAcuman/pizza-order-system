package web.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ResetPasswordRequest {
    @NotBlank(message = "Password is required!")
    @NotNull
    private String password;

    @NotBlank(message = "Token is required!")
    @NotNull
    private String token;
}
