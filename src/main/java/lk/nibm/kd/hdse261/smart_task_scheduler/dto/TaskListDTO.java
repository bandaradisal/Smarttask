package lk.nibm.kd.hdse261.smart_task_scheduler.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lk.nibm.kd.hdse261.smart_task_scheduler.validations.ValidationPatterns;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskListDTO {

    @NotBlank(message = "Task list name is required")
    @Size(min = 2, max = 50, message = "Task list name must be between 2 and 50 characters")
    private String name;

    @NotBlank(message = "Color is required")
    @Pattern(
            regexp = ValidationPatterns.HEX_COLOR,
            message = "Color must be a valid hex color. Example: #FF5733"
    )
    private String color;

    @Positive(message = "Group ID must be a positive number")
    private Long groupId;
}