package lk.nibm.kd.hdse261.smart_task_scheduler.services;

import lk.nibm.kd.hdse261.smart_task_scheduler.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private TaskRepository repository;

    @Autowired
    public UserService(TaskRepository repository){
        this.repository = repository;
    }

    
}
