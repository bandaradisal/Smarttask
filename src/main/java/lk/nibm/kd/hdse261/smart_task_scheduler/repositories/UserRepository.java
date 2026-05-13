package lk.nibm.kd.hdse261.smart_task_scheduler.repositories;

import lk.nibm.kd.hdse261.smart_task_scheduler.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository <User,Long>{

}
