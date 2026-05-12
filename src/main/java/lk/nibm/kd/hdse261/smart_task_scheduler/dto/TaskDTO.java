package lk.nibm.kd.hdse261.smart_task_scheduler.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {

    private String title;
    private String description;
    private String priority;
    private String deadline;   // String is easier for frontend
    private Long taskListId;

    // getters and setters

}
