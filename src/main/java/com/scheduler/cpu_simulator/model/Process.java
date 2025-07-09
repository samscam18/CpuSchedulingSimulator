package com.scheduler.cpu_simulator.model;

public class Process {
    private String pid;
    private int arrivalTime;
    private int burstTime;
    private int priority;

    private int completionTime;
    private int turnaroundTime;
    private int waitingTime;

    public String getPid() { return pid; }
    public void setPid(String pid) { this.pid = pid; }

    public int getArrivalTime() { return arrivalTime; }
    public void setArrivalTime(int arrivalTime) { this.arrivalTime = arrivalTime; }

    public int getBurstTime() { return burstTime; }
    public void setBurstTime(int burstTime) { this.burstTime = burstTime; }

    public int getPriority() { return priority; }
    public void setPriority(int priority) { this.priority = priority; }

    public int getCompletionTime() { return completionTime; }
    public void setCompletionTime(int completionTime) { this.completionTime = completionTime; }

    public int getTurnaroundTime() { return turnaroundTime; }
    public void setTurnaroundTime(int turnaroundTime) { this.turnaroundTime = turnaroundTime; }

    public int getWaitingTime() { return waitingTime; }
    public void setWaitingTime(int waitingTime) { this.waitingTime = waitingTime; }
}
