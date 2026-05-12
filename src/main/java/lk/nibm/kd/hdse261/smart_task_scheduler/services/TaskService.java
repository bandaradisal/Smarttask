package lk.nibm.kd.hdse261.smart_task_scheduler.services;

import lk.nibm.kd.hdse261.smart_task_scheduler.dto.TaskDTO;
import lk.nibm.kd.hdse261.smart_task_scheduler.dto.TaskResponseDTO;
import lk.nibm.kd.hdse261.smart_task_scheduler.entities.Task;
import lk.nibm.kd.hdse261.smart_task_scheduler.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repository;

    @Autowired
    public TaskService(TaskRepository repository){
        this.repository = repository;
    }

    // CREATE
    public TaskResponseDTO createTask(TaskDTO dto){

        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setPriority(dto.getPriority());
        task.setCompleted(false);

        Task saved = repository.save(task);

        return mapToResponse(saved);
    }

    // GET ALL
    public List<TaskResponseDTO> getAll(){

        List<Task> tasks = repository.findAll();

        return tasks.stream()
                .map(this::mapToResponse)
                .toList();
    }

    // GET BY ID
    public TaskResponseDTO getById(Long id){

        Task task = repository.findById(id).orElseThrow();

        return mapToResponse(task);
    }

    // UPDATE
    public TaskResponseDTO updateTask(Long id, TaskDTO dto){

        Task existing = repository.findById(id).orElseThrow();

        existing.setTitle(dto.getTitle());
        existing.setDescription(dto.getDescription());
        existing.setPriority(dto.getPriority());

        Task updated = repository.save(existing);

        return mapToResponse(updated);
    }

    // DELETE
    public boolean deleteTask(Long id){

        if(repository.existsById(id)){
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    //Mapper method
    private TaskResponseDTO mapToResponse(Task task){

        TaskResponseDTO dto = new TaskResponseDTO();

        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setCompleted(task.isCompleted());
        dto.setPriority(task.getPriority());

        return dto;
    }
}
