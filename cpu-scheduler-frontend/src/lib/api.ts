import { Process } from '@/types/process';

const API_BASE_URL = 'http://localhost:8080/api/scheduler';

export class SchedulerAPI {
  static async runFCFS(processes: Process[]): Promise<Process[]> {
    const response = await fetch(`${API_BASE_URL}/fcfs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(processes),
    });
    
    if (!response.ok) {
      throw new Error('Failed to run FCFS simulation');
    }
    
    return response.json();
  }

  static async runSJF(processes: Process[]): Promise<Process[]> {
    const response = await fetch(`${API_BASE_URL}/sjf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(processes),
    });
    
    if (!response.ok) {
      throw new Error('Failed to run SJF simulation');
    }
    
    return response.json();
  }

  static async runPriority(processes: Process[]): Promise<Process[]> {
    const response = await fetch(`${API_BASE_URL}/priority`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(processes),
    });
    
    if (!response.ok) {
      throw new Error('Failed to run Priority simulation');
    }
    
    return response.json();
  }

  static async runRoundRobin(processes: Process[], quantum: number): Promise<Process[]> {
    const response = await fetch(`${API_BASE_URL}/rr?quantum=${quantum}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(processes),
    });
    
    if (!response.ok) {
      throw new Error('Failed to run Round Robin simulation');
    }
    
    return response.json();
  }
}
