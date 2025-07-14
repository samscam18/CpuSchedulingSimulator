# CPU Scheduling Simulator Frontend

A modern Next.js frontend for the CPU Scheduling Simulator backend. This application provides an interactive interface for simulating different CPU scheduling algorithms.

## Features

- **Multiple Scheduling Algorithms**:

  - First Come First Served (FCFS)
  - Shortest Job First (SJF)
  - Priority Scheduling
  - Round Robin (RR)

- **Interactive Process Management**:

  - Add processes with arrival time, burst time, and priority
  - Remove individual processes
  - Clear all processes

- **Visual Results**:

  - Detailed results table showing completion times, turnaround times, and waiting times
  - Gantt chart visualization
  - Average waiting time and turnaround time calculations

- **Modern UI**:
  - Responsive design with Tailwind CSS
  - Clean and intuitive interface
  - Real-time error handling and validation

## Prerequisites

- Node.js 18+
- Your CPU Scheduling Simulator backend running on `http://localhost:8080`

## Installation

1. Navigate to the frontend directory:

   ```bash
   cd cpu-scheduler-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. **Select Algorithm**: Choose from FCFS, SJF, Priority, or Round Robin
2. **Add Processes**: Enter process details (ID, arrival time, burst time, and priority if needed)
3. **Run Simulation**: Click "Run Simulation" to send data to the backend
4. **View Results**: See the detailed results table and Gantt chart
5. **Clear and Repeat**: Clear processes to start a new simulation

## API Integration

The frontend communicates with the Spring Boot backend via REST APIs:

- `POST /api/scheduler/fcfs` - First Come First Served
- `POST /api/scheduler/sjf` - Shortest Job First
- `POST /api/scheduler/priority` - Priority Scheduling
- `POST /api/scheduler/rr?quantum={value}` - Round Robin

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main page component
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ProcessInputForm.tsx
│   ├── ProcessTable.tsx
│   ├── ResultsTable.tsx
│   └── GanttChart.tsx
├── lib/                   # Utility libraries
│   ├── api.ts            # API client
│   └── utils.ts          # Helper functions
└── types/                 # TypeScript type definitions
    └── process.ts
```

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management
- **Fetch API** - HTTP requests
