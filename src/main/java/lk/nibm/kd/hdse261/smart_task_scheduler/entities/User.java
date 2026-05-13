package lk.nibm.kd.hdse261.smart_task_scheduler.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false,unique = true)
    private String email;
    @Column(nullable = false)
    private String password;

}
