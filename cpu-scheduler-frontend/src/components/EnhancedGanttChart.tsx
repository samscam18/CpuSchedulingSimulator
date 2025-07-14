'use client';

import { Process } from '@/types/process';
import { Clock, BarChart3, Cpu, Settings } from 'lucide-react';
import styles from '@/styles/EnhancedGantt.module.css';

interface EnhancedGanttChartProps {
  results: Process[];
  selectedAlgorithm: string;
  quantum?: number;
}

export default function EnhancedGanttChart({ results, selectedAlgorithm, quantum }: EnhancedGanttChartProps) {
  if (results.length === 0) return null;

  const maxTime = Math.max(...results.map(p => p.completionTime || 0));
  const sortedResults = [...results].sort((a, b) => (a.arrivalTime || 0) - (b.arrivalTime || 0));

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

  const gradientColors = [
    'from-red-500 to-red-600',
    'from-blue-500 to-blue-600',
    'from-green-500 to-green-600', 
    'from-yellow-500 to-yellow-600',
    'from-purple-500 to-purple-600',
    'from-pink-500 to-pink-600',
    'from-indigo-500 to-indigo-600',
    'from-teal-500 to-teal-600',
  ];

  return (
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
            <div className="flex-1 relative h-16">
              {/* Grid background */}
              <div className="absolute inset-0 flex">
                {Array.from({ length: maxTime + 1 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="border-l border-gray-700 opacity-30 flex-1 min-w-[40px]"
                  />
                ))}
              </div>
              
              {/* Process blocks */}
              {sortedResults.map((process, index) => {
                const startTime = process.arrivalTime || 0;
                const endTime = process.completionTime || 0;
                const duration = endTime - startTime;
                const leftPercent = (startTime / maxTime) * 100;
                const widthPercent = Math.max((duration / maxTime) * 100, 8);
                
                return (
                  <div
                    key={index}
                    className={`absolute bg-gradient-to-r ${gradientColors[index % gradientColors.length]} 
                              text-white font-semibold text-sm flex items-center justify-center
                              border-2 border-gray-600 rounded-md shadow-lg h-12
                              transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-xl
                              animate-in slide-in-from-left duration-700`}
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                      animationDelay: `${index * 200}ms`
                    }}
                    title={`${process.pid}: ${startTime} → ${endTime} (${duration} units)`}
                  >
                    <div className="text-center">
                      <div className="font-bold">{process.pid}</div>
                      <div className="text-xs opacity-90">{duration}u</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Time scale */}
          <div className="flex items-center">
            <div className="w-20"></div>
            <div className="flex-1 relative">
              <div className="flex justify-between text-xs text-gray-400 font-mono">
                {Array.from({ length: maxTime + 1 }).map((_, i) => (
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
            {selectedAlgorithm === 'rr' && quantum && (
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
              {results.map((process, index) => (
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
              ))}
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
  );
}
