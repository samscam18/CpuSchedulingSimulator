'use client';

import { ProcessInput } from '@/types/process';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DemoDataLoaderProps {
  onLoadDemoAction: (processes: ProcessInput[]) => void;
}

const demoSets = {
  basic: {
    name: "Basic Example",
    description: "Simple 3-process example",
    emoji: "📚",
    processes: [
      { pid: "P1", arrivalTime: "0", burstTime: "10", priority: "3" },
      { pid: "P2", arrivalTime: "2", burstTime: "5", priority: "1" },
      { pid: "P3", arrivalTime: "4", burstTime: "8", priority: "2" }
    ]
  },
  complex: {
    name: "Complex Scenario",
    description: "Multi-process with varied times",
    emoji: "🔧",
    processes: [
      { pid: "P1", arrivalTime: "0", burstTime: "8", priority: "2" },
      { pid: "P2", arrivalTime: "1", burstTime: "4", priority: "1" },
      { pid: "P3", arrivalTime: "2", burstTime: "9", priority: "3" },
      { pid: "P4", arrivalTime: "3", burstTime: "5", priority: "2" },
      { pid: "P5", arrivalTime: "4", burstTime: "2", priority: "1" }
    ]
  },
  priority: {
    name: "Priority Test",
    description: "Different priority levels",
    emoji: "🎯",
    processes: [
      { pid: "High", arrivalTime: "0", burstTime: "6", priority: "1" },
      { pid: "Medium", arrivalTime: "1", burstTime: "8", priority: "2" },
      { pid: "Low", arrivalTime: "2", burstTime: "4", priority: "3" },
      { pid: "Urgent", arrivalTime: "3", burstTime: "3", priority: "0" }
    ]
  }
};

export default function DemoDataLoader({ onLoadDemoAction }: DemoDataLoaderProps) {
  return (
    <Card className="mb-6 shadow-lg border-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 dark:border-indigo-800">
      <CardHeader>
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
          <span>🎮</span>
          Quick Demo Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(demoSets).map(([key, demo]) => (
            <Card key={key} className="border border-slate-200 dark:border-slate-700 dark:bg-slate-800/50 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="text-center space-y-3">
                  <div className="text-3xl">{demo.emoji}</div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">{demo.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{demo.description}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs dark:bg-slate-700 dark:text-slate-300">
                    {demo.processes.length} processes
                  </Badge>
                  <Button
                    onClick={() => onLoadDemoAction(demo.processes)}
                    variant="outline"
                    size="sm"
                    className="w-full mt-2 hover:bg-indigo-50 hover:border-indigo-300 dark:hover:bg-indigo-900/20 dark:hover:border-indigo-700"
                  >
                    Load Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
