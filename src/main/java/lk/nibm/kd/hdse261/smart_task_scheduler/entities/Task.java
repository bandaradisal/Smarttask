package lk.nibm.kd.hdse261.smart_task_scheduler.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "tasks")
@Data
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    private String priority;

    private boolean completed;

    private boolean favourite;

    private LocalDate deadline;

    private Long taskListId;
}