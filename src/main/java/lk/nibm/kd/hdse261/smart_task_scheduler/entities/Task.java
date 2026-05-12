package lk.nibm.kd.hdse261.smart_task_scheduler.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    private String description;
    private String priority; // HIGH, MEDIUM, LOW
    private boolean completed;
    private boolean favourite;
    private LocalDate deadline;
    private Long taskListId;

}
