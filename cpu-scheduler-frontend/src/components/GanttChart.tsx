'use client';

import { Process } from '@/types/process';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import styles from './GanttChart.module.css';

interface GanttChartProps {
  processes: Process[];
  algorithm: string;
}

interface GanttBlock {
  processId: string;
  startTime: number;
  endTime: number;
  colorClass: string;
  width: number;
}

export default function GanttChart({ processes, algorithm }: GanttChartProps) {
  if (processes.length === 0) {
    return null;
  }

  const colorClasses = [
    'bg-gradient-to-r from-red-400 to-red-500',
    'bg-gradient-to-r from-blue-400 to-blue-500',
    'bg-gradient-to-r from-green-400 to-green-500',
    'bg-gradient-to-r from-yellow-400 to-yellow-500',
    'bg-gradient-to-r from-purple-400 to-purple-500',
    'bg-gradient-to-r from-pink-400 to-pink-500',
    'bg-gradient-to-r from-indigo-400 to-indigo-500',
    'bg-gradient-to-r from-teal-400 to-teal-500',
  ];

  const legendColors = [
    'bg-red-400',
    'bg-blue-400',
    'bg-green-400',
    'bg-yellow-400',
    'bg-purple-400',
    'bg-pink-400',
    'bg-indigo-400',
    'bg-teal-400',
  ];

  const generateGanttChart = (): GanttBlock[] => {
    const blocks: GanttBlock[] = [];
    let currentTime = 0;

    // Sort processes by completion time for visualization
    const sortedProcesses = [...processes].sort((a, b) => (a.completionTime || 0) - (b.completionTime || 0));
    const maxTime = Math.max(...processes.map(p => p.completionTime || 0));

    sortedProcesses.forEach((process, index) => {
      const startTime = currentTime;
      const endTime = process.completionTime || 0;
      
      if (startTime < endTime) {
        blocks.push({
          processId: process.pid,
          startTime,
          endTime,
          colorClass: colorClasses[index % colorClasses.length],
          width: ((endTime - startTime) / maxTime) * 100,
        });
        currentTime = endTime;
      }
    });

    return blocks;
  };

  const ganttBlocks = generateGanttChart();

  const getAlgorithmBadgeColor = (algo: string) => {
    switch (algo.toLowerCase()) {
      case 'fcfs': return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700';
      case 'sjf': return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700';
      case 'priority': return 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700';
      case 'rr': return 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900 dark:text-orange-200 dark:border-orange-700';
      default: return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600';
    }
  };

  return (
    <Card className="mb-6 shadow-xl border-0 bg-gradient-to-br from-white to-slate-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
          <span>📊</span>
          Gantt Chart
          <Badge className={`${getAlgorithmBadgeColor(algorithm)} font-semibold`}>
            {algorithm.toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Gantt Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-6 shadow-lg">
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Timeline */}
              <div className="flex border-b-4 border-slate-300 mb-4 rounded-t-lg overflow-hidden shadow-sm">
                {ganttBlocks.map((block, index) => (
                  <div
                    key={index}
                    className={`${block.colorClass} ${styles.ganttBlock} text-white font-bold text-center flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow relative group`}
                    style={{ width: `${block.width}%` }}
                  >
                    <span className="relative z-10">{block.processId}</span>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  </div>
                ))}
              </div>
              
              {/* Time labels */}
              <div className="flex">
                {ganttBlocks.map((block, index) => (
                  <div
                    key={index}
                    className={`${styles.timeLabel} font-medium`}
                    style={{ width: `${block.width}%` }}
                  >
                    <span className="bg-slate-100 dark:bg-gray-700 dark:text-gray-200 px-2 py-1 rounded text-xs">{block.startTime}</span>
                    {index === ganttBlocks.length - 1 && (
                      <span className="bg-slate-100 dark:bg-gray-700 dark:text-gray-200 px-2 py-1 rounded text-xs">{block.endTime}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Legend */}
        <Card className="border border-slate-200 dark:border-gray-700 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-700">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
              <span>🏷️</span>
              Process Legend
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {processes.map((process, index) => (
                <div key={process.pid} className="flex items-center space-x-3 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-slate-200 dark:border-gray-600">
                  <div className={`w-4 h-4 ${legendColors[index % legendColors.length]} rounded-sm shadow-sm`}></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{process.pid}</span>
                  <Badge variant="outline" className="text-xs bg-slate-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
                    {process.burstTime}ms
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
