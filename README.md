CPU Scheduling Simulator 🚀

A comprehensive full-stack application for simulating and visualizing CPU scheduling algorithms.
Built with a Spring Boot backend and a Next.js frontend, this project provides an interactive platform to understand different scheduling mechanisms with real-time visualization.

✨ Features
Supported Scheduling Algorithms

First Come First Served (FCFS) – Non-preemptive, based on arrival time

Shortest Job First (SJF) – Non-preemptive, based on burst time

Priority Scheduling – Non-preemptive, based on process priority

Round Robin (RR) – Preemptive scheduling with configurable time quantum

Interactive Features

Process Management – Add, remove, and configure processes with custom parameters

Real-time Visualization – Interactive Gantt chart for execution timeline

Performance Metrics – Waiting time, turnaround time, and completion time

Demo Data – Pre-loaded datasets for quick testing

Responsive Design – Works seamlessly across devices

Dark/Light Theme – Toggleable UI themes

Visual Components

Enhanced Gantt Chart – Animated visualization of process execution

Results Table – Detailed process execution breakdown

Statistics Dashboard – Average performance metrics and summary

Algorithm Comparison – Side-by-side performance evaluation

🏗️ Architecture
Backend (Spring Boot)
src/main/java/com/scheduler/cpu_simulator/
├── CpuSimulatorApplication.java     # Main entry point
├── controller/
│   ├── SchedulerController.java     # REST API endpoints
│   └── SimulationRequest.java       # Request DTOs
├── model/
│   └── Process.java                 # Process entity
└── service/
    └── SchedulerService.java        # Core scheduling algorithms

Frontend (Next.js)
cpu-scheduler-frontend/src/
├── app/
│   ├── page.tsx                     # Main application page
│   ├── layout.tsx                   # Root layout
│   └── globals.css                  # Global styles
├── components/
│   ├── EnhancedGanttChart.tsx       # Advanced Gantt visualization
│   ├── GanttChart.tsx               # Basic Gantt chart
│   ├── ProcessInputForm.tsx         # Input interface
│   ├── ProcessTable.tsx             # Process management
│   ├── ResultsTable.tsx             # Results display
│   ├── StatisticsDashboard.tsx      # Metrics summary
│   ├── ThemeToggle.tsx              # Theme switcher
│   └── DemoDataLoader.tsx           # Preloaded demo data
├── contexts/ThemeContext.tsx        # Theme management
├── lib/api.ts                       # API client
├── lib/utils.ts                     # Utility functions
└── types/process.ts                 # Type definitions

🛠️ Technology Stack
Backend

Java 21

Spring Boot 3.5.3 (REST APIs, DevTools)

Maven (dependency management)

Lombok (boilerplate reduction)

Frontend

Next.js 15 (React + SSR)

TypeScript (type safety)

Tailwind CSS 4 (modern UI)

Lucide React (icons), Radix UI (accessible components), Framer Motion (animations)

Development Tools

ESLint, PostCSS

Maven Wrapper

Git for version control

📋 Prerequisites

Java 21+

Node.js 18+ & npm

Maven 3.6+ (or Maven wrapper)

Git

🚀 Installation & Setup

Clone the Repository

git clone https://github.com/Bhavesh0577/CpuSchedulingSimulator.git
cd CpuSchedulingSimulator


Backend Setup (Spring Boot)

./mvnw spring-boot:run   # With Maven wrapper
# or
mvn spring-boot:run
# Runs on http://localhost:8080


Frontend Setup (Next.js)

cd cpu-scheduler-frontend
npm install
npm run dev
# Runs on http://localhost:3000

🎯 Usage Guide

Start both backend and frontend.

Open http://localhost:3000
.

Add processes manually or load demo data.

Choose an algorithm (FCFS, SJF, Priority, RR).

Run simulation → View results, charts, and metrics.

🔧 API Documentation
Endpoints

FCFS → POST /api/scheduler/fcfs

SJF → POST /api/scheduler/sjf

Priority → POST /api/scheduler/priority

Round Robin → POST /api/scheduler/rr?quantum=2

Example Request
[
  {
    "pid": "P1",
    "arrivalTime": 0,
    "burstTime": 10,
    "priority": 1
  }
]

🧪 Algorithms Implemented

FCFS – Simple, but may cause high waiting time

SJF – Minimum average waiting time, but risk of starvation

Priority – Higher priority processes first, but starvation possible

Round Robin – Fair CPU sharing, may increase context switching

📊 Performance Metrics

Completion Time

Turnaround Time

Waiting Time

Average Waiting & Turnaround Times

Comparison Dashboard – Compare algorithms side by side

📈 Future Enhancements

Additional algorithms (SRTF, Multilevel Queue, MLFQ)

Process aging & deadline scheduling

Export results (CSV/PDF)

Mobile version (React Native)

Advanced analytics dashboard

🤝 Contributing

Fork the repository

Create a feature branch: git checkout -b feature/YourFeature

Commit changes: git commit -m "Add YourFeature"

Push branch: git push origin feature/YourFeature

Open a Pull Request

🐛 Troubleshooting

Backend

Port 8080 in use → Change in application.properties

Java mismatch → Ensure Java 21+

Maven build issues → Use ./mvnw

Frontend

Node version errors → Ensure Node.js 18+

Dependency issues → Run npm install

CORS/API issues → Confirm backend is running on :8080

📞 Support

GitHub Issues – Report bugs

Email – samarthfirangi44@gmail.com
