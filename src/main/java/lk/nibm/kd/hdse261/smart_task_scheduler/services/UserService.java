package lk.nibm.kd.hdse261.smart_task_scheduler.services;

import lk.nibm.kd.hdse261.smart_task_scheduler.repositories.TaskRepository;
import lk.nibm.kd.hdse261.smart_task_scheduler.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private UserRepository repository;

    @Autowired
    public UserService(UserRepository repository){
        this.repository = repository;
    }

    //Register
}
