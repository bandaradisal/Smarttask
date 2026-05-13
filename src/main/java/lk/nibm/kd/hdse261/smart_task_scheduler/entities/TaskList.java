package lk.nibm.kd.hdse261.smart_task_scheduler.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "task_lists")
@Data
public class TaskList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String color;

    private Long groupId;

    private Long userId;
}