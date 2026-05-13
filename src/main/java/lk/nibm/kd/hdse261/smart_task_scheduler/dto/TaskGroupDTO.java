package lk.nibm.kd.hdse261.smart_task_scheduler.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskGroupDTO {

    @NotBlank(message = "Task group name is required")
    @Size(min = 2, max = 50, message = "Task group name must be between 2 and 50 characters")
    private String name;
}