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
public class TaskDTO {

    @NotBlank(message = "Task title is required")
    @Size(min = 3, max = 100, message = "Task title must be between 3 and 100 characters")
    private String title;

    @Size(max = 500, message = "Description cannot be more than 500 characters")
    private String description;

    @NotBlank(message = "Priority is required")
    @Pattern(
            regexp = ValidationPatterns.PRIORITY,
            message = "Priority must be HIGH, MEDIUM, or LOW"
    )
    private String priority;

    @NotBlank(message = "Deadline is required")
    @Pattern(
            regexp = ValidationPatterns.DATE_YYYY_MM_DD,
            message = "Deadline must be in yyyy-MM-dd format. Example: 2026-05-20"
    )
    private String deadline;

    @Positive(message = "Task list ID must be a positive number")
    private Long taskListId;
}