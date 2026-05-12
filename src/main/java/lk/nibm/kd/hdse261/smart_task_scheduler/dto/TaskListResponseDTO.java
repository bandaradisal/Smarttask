package lk.nibm.kd.hdse261.smart_task_scheduler.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskListResponseDTO {

    private Long id;
    private String name;
    private String color;

    // getters and setters

}
