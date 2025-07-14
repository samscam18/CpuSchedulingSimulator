'use client';

import { useState } from 'react';
import { ProcessInput } from '@/types/process';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

interface SimpleProcessInputProps {
  onAddProcess: (process: ProcessInput) => void;
  showPriority: boolean;
}

export default function SimpleProcessInput({ onAddProcess, showPriority }: SimpleProcessInputProps) {
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
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="pid" className="text-white text-sm mb-1 block">
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
            className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
          />
        </div>
        
        <div>
          <Label htmlFor="arrivalTime" className="text-white text-sm mb-1 block">
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
            className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
          />
        </div>
        
        <div>
          <Label htmlFor="burstTime" className="text-white text-sm mb-1 block">
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
            className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
          />
        </div>
        
        {showPriority && (
          <div>
            <Label htmlFor="priority" className="text-white text-sm mb-1 block">
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
              className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
            />
          </div>
        )}
      </div>
      
      <Button
        type="submit"
        className="w-full bg-yellow-500 text-black hover:bg-yellow-600 font-semibold"
      >
        Add Process
      </Button>
    </form>
  );
}
