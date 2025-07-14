package com.scheduler.cpu_simulator.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.scheduler.cpu_simulator.model.Process;

@Service
public class SchedulerService {

    public List<Process> simulateFCFS(List<Process> processes) {
        processes.sort(Comparator.comparingInt(Process::getArrivalTime));
        int time = 0;
        for (Process p : processes) {
            if (time < p.getArrivalTime()) time = p.getArrivalTime();
            time += p.getBurstTime();
            p.setCompletionTime(time);
            p.setTurnaroundTime(time - p.getArrivalTime());
            p.setWaitingTime(p.getTurnaroundTime() - p.getBurstTime());
        }
        return processes;
    }

    public List<Process> simulateSJF(List<Process> processes) {
        List<Process> result = new ArrayList<>();
        List<Process> queue = new ArrayList<>(processes);
        queue.sort(Comparator.comparingInt(Process::getArrivalTime));
        int time = 0;

        while (!queue.isEmpty()) {
            List<Process> ready = new ArrayList<>();
            for (Process p : queue) {
                if (p.getArrivalTime() <= time) {
                    ready.add(p);
                }
            }

            if (ready.isEmpty()) {
                time = queue.get(0).getArrivalTime();
                continue;
            }

            Process shortest = ready.stream().min(Comparator.comparingInt(Process::getBurstTime)).get();
            queue.remove(shortest);
            if (time < shortest.getArrivalTime()) time = shortest.getArrivalTime();
            time += shortest.getBurstTime();
            shortest.setCompletionTime(time);
            shortest.setTurnaroundTime(time - shortest.getArrivalTime());
            shortest.setWaitingTime(shortest.getTurnaroundTime() - shortest.getBurstTime());
            result.add(shortest);
        }

        return result;
    }

    public List<Process> simulatePriority(List<Process> processes) {
        List<Process> result = new ArrayList<>();
        List<Process> queue = new ArrayList<>(processes);
        queue.sort(Comparator.comparingInt(Process::getArrivalTime));
        int time = 0;

        while (!queue.isEmpty()) {
            List<Process> ready = new ArrayList<>();
            for (Process p : queue) {
                if (p.getArrivalTime() <= time) {
                    ready.add(p);
                }
            }

            if (ready.isEmpty()) {
                time = queue.get(0).getArrivalTime();
                continue;
            }

            Process highest = ready.stream().min(Comparator.comparingInt(Process::getPriority)).get();
            queue.remove(highest);
            if (time < highest.getArrivalTime()) time = highest.getArrivalTime();
            time += highest.getBurstTime();
            highest.setCompletionTime(time);
            highest.setTurnaroundTime(time - highest.getArrivalTime());
            highest.setWaitingTime(highest.getTurnaroundTime() - highest.getBurstTime());
            result.add(highest);
        }

        return result;
    }

    public List<Process> simulateRoundRobin(List<Process> processes, int quantum) {
        List<Process> queue = new ArrayList<>(processes);
        queue.sort(Comparator.comparingInt(Process::getArrivalTime));
        int time = 0;
        Queue<Process> readyQueue = new LinkedList<>();
        Map<String, Integer> remainingTime = new HashMap<>();
        for (Process p : processes) {
            remainingTime.put(p.getPid(), p.getBurstTime());
        }

        int index = 0;
        List<Process> result = new ArrayList<>();
        Set<String> completed = new HashSet<>();

        while (!queue.isEmpty() || !readyQueue.isEmpty()) {
            while (index < queue.size() && queue.get(index).getArrivalTime() <= time) {
                readyQueue.add(queue.get(index));
                index++;
            }

            if (readyQueue.isEmpty()) {
                time = queue.get(index).getArrivalTime();
                continue;
            }

            Process current = readyQueue.poll();
            int remaining = remainingTime.get(current.getPid());
            int timeUsed = Math.min(quantum, remaining);
            time += timeUsed;
            remaining -= timeUsed;
            remainingTime.put(current.getPid(), remaining);

            while (index < queue.size() && queue.get(index).getArrivalTime() <= time) {
                readyQueue.add(queue.get(index));
                index++;
            }

            if (remaining == 0 && !completed.contains(current.getPid())) {
                current.setCompletionTime(time);
                current.setTurnaroundTime(time - current.getArrivalTime());
                current.setWaitingTime(current.getTurnaroundTime() - current.getBurstTime());
                result.add(current);
                completed.add(current.getPid());
            } else {
                readyQueue.add(current);
            }
        }

        return result;
    }
}
