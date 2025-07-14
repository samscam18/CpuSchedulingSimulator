export interface Process {
  pid: string;
  arrivalTime: number;
  burstTime: number;
  priority: number;
  completionTime?: number;
  turnaroundTime?: number;
  waitingTime?: number;
}

export interface ProcessInput {
  pid: string;
  arrivalTime: string;
  burstTime: string;
  priority: string;
}

export type SchedulingAlgorithm = 'fcfs' | 'sjf' | 'priority' | 'rr';

export interface SimulationResult {
  processes: Process[];
  averageWaitingTime: number;
  averageTurnaroundTime: number;
  algorithm: string;
}
