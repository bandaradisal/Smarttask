package lk.nibm.kd.hdse261.smart_task_scheduler.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lk.nibm.kd.hdse261.smart_task_scheduler.validations.ValidationPatterns;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be in valid format. Example: user@gmail.com")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 50, message = "Password must be between 6 and 50 characters")
    private String password;

    @Pattern(
            regexp = ValidationPatterns.PHONE_10_DIGITS,
            message = "Phone number must contain exactly 10 numbers"
    )
    private String phoneNumber;
}