'use client';

import { useState } from 'react';
import { Process, ProcessInput, SchedulingAlgorithm } from '@/types/process';
import { SchedulerAPI } from '@/lib/api';
import SimpleProcessInput from '@/components/SimpleProcessInput';
import ThemeToggle from '@/components/ThemeToggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Play, Trash2, Clock, Cpu, Settings, BarChart3 } from 'lucide-react';
import styles from '@/styles/EnhancedGantt.module.css';

function HomePage() {
  const [processes, setProcesses] = useState<ProcessInput[]>([]);
  const [results, setResults] = useState<Process[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SchedulingAlgorithm>('fcfs');
  const [quantum, setQuantum] = useState<number>(2);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const addProcess = (process: ProcessInput) => {
    setProcesses([...processes, process]);
  };

  const removeProcess = (index: number) => {
    setProcesses(processes.filter((_, i) => i !== index));
  };

  const clearProcesses = () => {
    setProcesses([]);
    setResults([]);
    setError('');
  };

  const loadDemoData = (demoProcesses: ProcessInput[]) => {
    setProcesses(demoProcesses);
    setResults([]);
    setError('');
  };

  const convertToProcess = (processInput: ProcessInput): Process => ({
    pid: processInput.pid,
    arrivalTime: parseInt(processInput.arrivalTime),
    burstTime: parseInt(processInput.burstTime),
    priority: parseInt(processInput.priority) || 0,
  });

  const runSimulation = async () => {
    if (processes.length === 0) {
      setError('Please add at least one process');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const processData = processes.map(convertToProcess);
      let result: Process[];

      switch (selectedAlgorithm) {
        case 'fcfs':
          result = await SchedulerAPI.runFCFS(processData);
          break;
        case 'sjf':
          result = await SchedulerAPI.runSJF(processData);
          break;
        case 'priority':
          result = await SchedulerAPI.runPriority(processData);
          break;
        case 'rr':
          result = await SchedulerAPI.runRoundRobin(processData, quantum);
          break;
        default:
          throw new Error('Invalid algorithm selected');
      }

      setResults(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during simulation');
    } finally {
      setIsLoading(false);
    }
  };

  const showPriority = selectedAlgorithm === 'priority';

  const algorithmDescriptions = {
    fcfs: "Processes are executed in the order they arrive in the ready queue.",
    sjf: "Process with the shortest burst time is executed first.",
    priority: "Processes are executed based on their priority level.",
    rr: "Each process gets a fixed time slice in a cyclic manner."
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Sidebar - Algorithm Selection */}
      <div className="w-80 bg-gray-900 border-r border-gray-800 p-6 space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            SCHEDULING ALGORITHM SIMULATOR
          </h1>
          <div className="flex items-center justify-between mt-4">
            <Badge variant="outline" className="border-green-500 text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Backend Ready
            </Badge>
            <ThemeToggle />
          </div>
        </div>

        {/* Algorithm Selection */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <h3 className="text-white text-lg font-semibold mb-4">
              Select a scheduling algorithm to simulate.
            </h3>
            <div className="space-y-3">
              <select
                value={selectedAlgorithm}
                onChange={(e) => setSelectedAlgorithm(e.target.value as SchedulingAlgorithm)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:border-blue-500 focus:outline-none"
                title="Select scheduling algorithm"
                aria-label="Select scheduling algorithm"
              >
                <option value="fcfs">First Come First Served</option>
                <option value="sjf">Shortest Job First</option>
                <option value="priority">Priority Scheduling</option>
                <option value="rr">Round Robin</option>
              </select>
              
              {selectedAlgorithm === 'rr' && (
                <div className="mt-4 p-3 bg-gray-700 rounded">
                  <Label htmlFor="quantum" className="text-white text-sm flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4" />
                    Time Quantum
                  </Label>
                  <Input
                    type="number"
                    id="quantum"
                    value={quantum}
                    onChange={(e) => setQuantum(parseInt(e.target.value) || 2)}
                    className="bg-gray-600 border-gray-500 text-white focus:border-blue-500"
                    min="1"
                  />
                </div>
              )}
              
              <Button
                onClick={runSimulation}
                disabled={isLoading || processes.length === 0}
                className="w-full bg-white text-black hover:bg-gray-200 font-semibold py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Simulating..." : "Submit"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Demo Data Loader */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <h3 className="text-white text-lg font-semibold mb-4">Quick Demo Data</h3>
            <div className="space-y-2">
              <Button
                onClick={() => loadDemoData([
                  { pid: "P1", arrivalTime: "0", burstTime: "10", priority: "3" },
                  { pid: "P2", arrivalTime: "2", burstTime: "5", priority: "1" },
                  { pid: "P3", arrivalTime: "4", burstTime: "8", priority: "2" }
                ])}
                variant="outline"
                className="w-full border-gray-600 text-white hover:bg-gray-700"
                size="sm"
              >
                Load Basic Set
              </Button>
              <Button
                onClick={() => loadDemoData([
                  { pid: "P1", arrivalTime: "0", burstTime: "8", priority: "2" },
                  { pid: "P2", arrivalTime: "1", burstTime: "4", priority: "1" },
                  { pid: "P3", arrivalTime: "2", burstTime: "9", priority: "3" },
                  { pid: "P4", arrivalTime: "3", burstTime: "5", priority: "2" },
                  { pid: "P5", arrivalTime: "4", burstTime: "2", priority: "1" }
                ])}
                variant="outline"
                className="w-full border-gray-600 text-white hover:bg-gray-700"
                size="sm"
              >
                Load Complex Set
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 space-y-6">
        {/* Processes Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Process Input */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-xl">Processes</CardTitle>
              <p className="text-gray-400">Add a process to simulate it</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <SimpleProcessInput onAddProcess={addProcess} showPriority={showPriority} />
              
              {/* Process List */}
              <div className="space-y-2">
                {processes.map((process, index) => (
                  <div key={index} className="flex items-center justify-between bg-yellow-500 text-black p-3 rounded">
                    <div>
                      <span className="font-semibold">Process {index + 1}</span>
                      <div className="text-sm">
                        Arrival Time: {process.arrivalTime} | Burst Time: {process.burstTime}
                        {showPriority && ` | Priority: ${process.priority}`}
                      </div>
                    </div>
                    <Button
                      onClick={() => removeProcess(index)}
                      variant="destructive"
                      size="sm"
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                {processes.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    No processes added yet
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={clearProcesses}
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-700"
                >
                  Clear all processes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Control Panel */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-xl">Control Panel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-3 bg-gray-800 rounded-lg">
                <p className="text-gray-400">
                  Processes: <span className="font-semibold text-white">{processes.length}</span>
                </p>
              </div>
              
              <Button
                onClick={runSimulation}
                disabled={isLoading || processes.length === 0}
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Running Simulation...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Run Simulation
                  </span>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="border-red-500 bg-red-900/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 text-red-400">
                <span className="text-2xl">⚠️</span>
                <span className="font-medium">{error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Section - Enhanced Gantt Chart */}
        {results.length > 0 && (
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Gantt Chart Visualization
                </CardTitle>
                <p className="text-gray-400 text-sm">Timeline execution of {selectedAlgorithm.toUpperCase()} algorithm</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Enhanced Timeline Visualization */}
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Process Execution Timeline
                    </h3>
                    
                    {/* Main Timeline */}
                    <div className="relative">
                      {/* Process execution bars */}
                      <div className="flex items-center mb-6">
                        <div className="w-20 text-gray-400 text-sm font-medium">Processes</div>
                        <div className="flex-1 relative">
                          {/* Process execution blocks */}
                          <div className={`relative ${styles.ganttContainer}`}>
                            {(() => {
                              const maxTime = Math.max(...results.map(p => p.completionTime || 0));
                              const sortedResults = [...results].sort((a, b) => (a.arrivalTime || 0) - (b.arrivalTime || 0));
                              
                              return sortedResults.map((process, index) => {
                                const startTime = process.arrivalTime || 0;
                                const endTime = process.completionTime || 0;
                                const duration = endTime - startTime;
                                
                                return (
                                  <div
                                    key={index}
                                    className={`${styles.ganttBlock} ${styles[`process${index % 8}`]} ${styles.animateIn}`}
                                    data-start-time={startTime}
                                    data-duration={duration}
                                    data-max-time={maxTime}
                                    data-animation-delay={index * 200}
                                    title={`${process.pid}: ${startTime} → ${endTime} (${duration} units)`}
                                  >
                                    <div className="text-center">
                                      <div className="font-bold">{process.pid}</div>
                                      <div className="text-xs opacity-90">{duration}u</div>
                                    </div>
                                  </div>
                                );
                              });
                            })()}
                          </div>
                        </div>
                      </div>
                      
                      {/* Time scale */}
                      <div className="flex items-center">
                        <div className="w-20"></div>
                        <div className="flex-1 relative">
                          <div className="flex justify-between text-xs text-gray-400 font-mono">
                            {Array.from({ length: Math.max(...results.map(p => p.completionTime || 0)) + 1 }).map((_, i) => (
                              <div key={i} className="flex flex-col items-center">
                                <div className="w-px h-2 bg-gray-600 mb-1"></div>
                                <span>{i}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Algorithm info */}
                    <div className="mt-4 p-3 bg-gray-700 rounded border-l-4 border-blue-500">
                      <div className="flex items-center gap-2 text-blue-400">
                        <Settings className="h-4 w-4" />
                        <span className="font-semibold">Algorithm: {selectedAlgorithm.toUpperCase()}</span>
                        {selectedAlgorithm === 'rr' && (
                          <span className="text-sm">• Quantum: {quantum} units</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Process Results Table */}
                  <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                    <div className="bg-gray-700 px-4 py-3 border-b border-gray-600">
                      <h3 className="text-white font-semibold flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Process Execution Details
                      </h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-white">
                        <thead>
                          <tr className="bg-gray-750">
                            <th className="text-left p-4 border-r border-gray-600 font-semibold">Process</th>
                            <th className="text-left p-4 border-r border-gray-600 font-semibold">Arrival</th>
                            <th className="text-left p-4 border-r border-gray-600 font-semibold">Burst</th>
                            <th className="text-left p-4 border-r border-gray-600 font-semibold">Completion</th>
                            <th className="text-left p-4 border-r border-gray-600 font-semibold">Waiting</th>
                            <th className="text-left p-4 font-semibold">Turnaround</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((process, index) => {
                            const colors = [
                              'bg-red-500',
                              'bg-blue-500',
                              'bg-green-500',
                              'bg-yellow-500',
                              'bg-purple-500',
                              'bg-pink-500',
                              'bg-indigo-500',
                              'bg-teal-500',
                            ];
                            
                            return (
                              <tr key={index} className="border-t border-gray-700 hover:bg-gray-750 transition-colors">
                                <td className="p-4 border-r border-gray-600">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-4 h-4 ${colors[index % colors.length]} rounded-full shadow-sm`}></div>
                                    <span className="font-semibold">{process.pid}</span>
                                  </div>
                                </td>
                                <td className="p-4 border-r border-gray-600 font-mono">{process.arrivalTime}</td>
                                <td className="p-4 border-r border-gray-600 font-mono">{process.burstTime}</td>
                                <td className="p-4 border-r border-gray-600 font-mono font-semibold text-green-400">{process.completionTime}</td>
                                <td className="p-4 border-r border-gray-600 font-mono text-yellow-400">{process.waitingTime || 0}</td>
                                <td className="p-4 font-mono text-blue-400">{process.turnaroundTime || 0}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Enhanced Statistics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-lg text-white shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium opacity-90">Avg Waiting Time</h3>
                          <p className="text-2xl font-bold">
                            {(results.reduce((sum, process) => sum + (process.waitingTime || 0), 0) / results.length).toFixed(1)}
                          </p>
                          <p className="text-xs opacity-75">time units</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-600 to-green-700 p-4 rounded-lg text-white shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                          <BarChart3 className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium opacity-90">Avg Turnaround Time</h3>
                          <p className="text-2xl font-bold">
                            {(results.reduce((sum, process) => sum + (process.turnaroundTime || 0), 0) / results.length).toFixed(1)}
                          </p>
                          <p className="text-xs opacity-75">time units</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-4 rounded-lg text-white shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                          <Cpu className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium opacity-90">Total Execution</h3>
                          <p className="text-2xl font-bold">
                            {Math.max(...results.map(p => p.completionTime || 0))}
                          </p>
                          <p className="text-xs opacity-75">time units</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}
