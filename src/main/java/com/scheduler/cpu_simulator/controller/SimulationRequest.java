package com.scheduler.cpu_simulator.controller;

import java.util.List;

import com.scheduler.cpu_simulator.model.Process;

public class SimulationRequest {
    private int quantum;
    private List<Process> processes;

    public int getQuantum() {
        return quantum;
    }

    public void setQuantum(int quantum) {
        this.quantum = quantum;
    }

    public List<Process> getProcesses() {
        return processes;
    }

    public void setProcesses(List<Process> processes) {
        this.processes = processes;
    }
}
