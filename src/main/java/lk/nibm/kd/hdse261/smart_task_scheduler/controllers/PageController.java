package lk.nibm.kd.hdse261.smart_task_scheduler.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * PageController — Member 4 | Frontend
 * Maps clean URL paths to Thymeleaf HTML templates.
 * All REST API endpoints remain in separate @RestController classes.
 */
@Controller
public class PageController {

    @GetMapping("/")
    public String dashboard() {
        return "index";
    }

    @GetMapping("/tasks-page")
    public String tasks() {
        return "tasks";
    }

    @GetMapping("/schedule")
    public String schedule() {
        return "schedule";
    }

    @GetMapping("/dependencies")
    public String dependencies() {
        return "dependencies";
    }

    @GetMapping("/task-form")
    public String taskForm() {
        return "task-form";
    }
}
