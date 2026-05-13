package lk.nibm.kd.hdse261.smart_task_scheduler.controllers;

import lk.nibm.kd.hdse261.smart_task_scheduler.dto.TaskDTO;
import lk.nibm.kd.hdse261.smart_task_scheduler.dto.TaskResponseDTO;
import lk.nibm.kd.hdse261.smart_task_scheduler.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService){
        this.taskService = taskService;
    }

    @PostMapping
    public TaskResponseDTO createTask(@RequestBody TaskDTO dto){
        return taskService.createTask(dto);
    }

    @GetMapping
    public List<TaskResponseDTO> getAllTasks(){
        return taskService.getAll();
    }

    @GetMapping("/{id}")
    public TaskResponseDTO getTask(@PathVariable Long id){
        return taskService.getById(id);
    }

    @PutMapping("/{id}")
    public TaskResponseDTO updateTask(@PathVariable Long id,
                                      @RequestBody TaskDTO dto){
        return taskService.updateTask(id, dto);
    }

    @DeleteMapping("/{id}")
    public boolean deleteTask(@PathVariable Long id){
        return taskService.deleteTask(id);
    }
}

