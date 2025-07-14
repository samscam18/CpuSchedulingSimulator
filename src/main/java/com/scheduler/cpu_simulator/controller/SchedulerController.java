package com.scheduler.cpu_simulator.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scheduler.cpu_simulator.model.Process;
import com.scheduler.cpu_simulator.service.SchedulerService;

@RestController
@RequestMapping("/api/scheduler")
@CrossOrigin("*")
public class SchedulerController {

    @Autowired
    private SchedulerService schedulerService;

    @PostMapping("/fcfs")
    public List<Process> runFCFS(@RequestBody List<Process> processes) {
        return schedulerService.simulateFCFS(processes);
    }

    @PostMapping("/sjf")
    public List<Process> runSJF(@RequestBody List<Process> processes) {
        return schedulerService.simulateSJF(processes);
    }

    @PostMapping("/priority")
    public List<Process> runPriority(@RequestBody List<Process> processes) {
        return schedulerService.simulatePriority(processes);
    }

    @PostMapping("/rr")
    public List<Process> runRR(@RequestBody SimulationRequest request) {
        return schedulerService.simulateRoundRobin(request.getProcesses(), request.getQuantum());
    }
}
