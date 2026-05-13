package lk.nibm.kd.hdse261.smart_task_scheduler.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class TaskList {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name; // Daily, Work
    private String color;
    private Long userId;

}
