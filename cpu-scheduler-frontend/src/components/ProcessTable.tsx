'use client';

import { ProcessInput } from '@/types/process';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ProcessTableProps {
  processes: ProcessInput[];
  onRemoveProcess: (index: number) => void;
  showPriority: boolean;
}

export default function ProcessTable({ processes, onRemoveProcess, showPriority }: ProcessTableProps) {
  if (processes.length === 0) {
    return (
      <Card className="mb-6 shadow-lg border-0 bg-gradient-to-br from-white to-slate-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Process List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-slate-500 dark:text-slate-400 text-lg">No processes added yet</p>
            <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">Add a process above to get started</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6 shadow-lg border-0 bg-gradient-to-br from-white to-slate-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent flex items-center justify-between">
          Process List
          <Badge variant="secondary" className="text-sm dark:bg-gray-700 dark:text-gray-300">
            {processes.length} process{processes.length !== 1 ? 'es' : ''}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-slate-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="font-semibold text-slate-700">Process ID</TableHead>
                <TableHead className="font-semibold text-slate-700">Arrival Time</TableHead>
                <TableHead className="font-semibold text-slate-700">Burst Time</TableHead>
                {showPriority && (
                  <TableHead className="font-semibold text-slate-700">Priority</TableHead>
                )}
                <TableHead className="font-semibold text-slate-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processes.map((process, index) => (
                <TableRow key={index} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="font-medium text-slate-900">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {process.pid}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-700">{process.arrivalTime}</TableCell>
                  <TableCell className="text-slate-700">{process.burstTime}</TableCell>
                  {showPriority && (
                    <TableCell className="text-slate-700">
                      <Badge variant="secondary" className="bg-purple-50 text-purple-700">
                        {process.priority}
                      </Badge>
                    </TableCell>
                  )}
                  <TableCell>
                    <Button
                      onClick={() => onRemoveProcess(index)}
                      variant="destructive"
                      size="sm"
                      className="hover:scale-105 transition-transform"
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
