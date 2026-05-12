package lk.nibm.kd.hdse261.smart_task_scheduler.entities;

import jakarta.persistence.Entity;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Task {

    Long id;
    String title;
    String description;
    String priority; // HIGH, MEDIUM, LOW
    boolean completed;
    boolean favourite;
    LocalDate deadline;
    Long taskListId;

}
