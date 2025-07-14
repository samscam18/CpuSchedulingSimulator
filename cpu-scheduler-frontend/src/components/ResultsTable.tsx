'use client';

import { Process } from '@/types/process';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ResultsTableProps {
  results: Process[];
  algorithm: string;
}

export default function ResultsTable({ results, algorithm }: ResultsTableProps) {
  if (results.length === 0) {
    return null;
  }

  const averageWaitingTime = results.reduce((sum, process) => sum + (process.waitingTime || 0), 0) / results.length;
  const averageTurnaroundTime = results.reduce((sum, process) => sum + (process.turnaroundTime || 0), 0) / results.length;

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
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-3">
          <span>🎯</span>
          Simulation Results
          <Badge className={`${getAlgorithmBadgeColor(algorithm)} font-semibold`}>
            {algorithm.toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Results Table */}
        <div className="rounded-lg border border-slate-200 overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100">
                <TableHead className="font-semibold text-slate-700">Process ID</TableHead>
                <TableHead className="font-semibold text-slate-700">Arrival Time</TableHead>
                <TableHead className="font-semibold text-slate-700">Burst Time</TableHead>
                <TableHead className="font-semibold text-slate-700">Completion Time</TableHead>
                <TableHead className="font-semibold text-slate-700">Turnaround Time</TableHead>
                <TableHead className="font-semibold text-slate-700">Waiting Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((process, index) => (
                <TableRow key={index} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="font-medium">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {process.pid}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-700">{process.arrivalTime}</TableCell>
                  <TableCell className="text-slate-700">{process.burstTime}</TableCell>
                  <TableCell className="text-slate-700 font-medium">{process.completionTime}</TableCell>
                  <TableCell className="text-slate-700 font-medium">{process.turnaroundTime}</TableCell>
                  <TableCell className="text-slate-700 font-medium">{process.waitingTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-500 rounded-full">
                  <span className="text-2xl">⏱️</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-1">Average Waiting Time</h3>
                  <p className="text-3xl font-bold text-blue-600">{averageWaitingTime.toFixed(2)}</p>
                  <p className="text-sm text-blue-600">time units</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100 hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-500 rounded-full">
                  <span className="text-2xl">🔄</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-emerald-800 mb-1">Average Turnaround Time</h3>
                  <p className="text-3xl font-bold text-emerald-600">{averageTurnaroundTime.toFixed(2)}</p>
                  <p className="text-sm text-emerald-600">time units</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
