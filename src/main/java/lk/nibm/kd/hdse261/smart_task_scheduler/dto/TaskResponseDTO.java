package lk.nibm.kd.hdse261.smart_task_scheduler.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskResponseDTO {

    private Long id;
    private String title;
    private boolean completed;
    private boolean favourite;
    private String priority;
    private String deadline;

    // getters and setters

}
