'use client';

import { useState } from 'react';
import { ProcessInput } from '@/types/process';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

interface ProcessInputFormProps {
  onAddProcess: (process: ProcessInput) => void;
  showPriority: boolean;
}

export default function ProcessInputForm({ onAddProcess, showPriority }: ProcessInputFormProps) {
  const [formData, setFormData] = useState<ProcessInput>({
    pid: '',
    arrivalTime: '',
    burstTime: '',
    priority: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.pid && formData.arrivalTime && formData.burstTime) {
      onAddProcess(formData);
      setFormData({
        pid: '',
        arrivalTime: '',
        burstTime: '',
        priority: showPriority ? '' : '0',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card className="mb-6 shadow-lg border-0 bg-gradient-to-br from-white to-slate-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
          <Plus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          Add Process
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label htmlFor="pid" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Process ID
              </Label>
              <Input
                type="text"
                id="pid"
                name="pid"
                value={formData.pid}
                onChange={handleChange}
                placeholder="P1"
                required
                className="border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="arrivalTime" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Arrival Time
              </Label>
              <Input
                type="number"
                id="arrivalTime"
                name="arrivalTime"
                value={formData.arrivalTime}
                onChange={handleChange}
                placeholder="0"
                min="0"
                required
                className="border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="burstTime" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Burst Time
              </Label>
              <Input
                type="number"
                id="burstTime"
                name="burstTime"
                value={formData.burstTime}
                onChange={handleChange}
                placeholder="5"
                min="1"
                required
                className="border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            {showPriority && (
              <div className="space-y-2">
                <Label htmlFor="priority" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Priority
                </Label>
                <Input
                  type="number"
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  placeholder="1"
                  min="0"
                  required={showPriority}
                  className="border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            )}
          </div>
          
          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Process
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
