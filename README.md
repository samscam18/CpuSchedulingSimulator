# CPU Scheduling Simulator

A comprehensive full-stack application for simulating and visualizing CPU scheduling algorithms. Built with Spring Boot backend and Next.js frontend, this project provides an interactive platform to understand different CPU scheduling mechanisms with real-time visualization.

## 🚀 Features

### Supported Scheduling Algorithms

- **First Come First Served (FCFS)** - Non-preemptive scheduling based on arrival time
- **Shortest Job First (SJF)** - Non-preemptive scheduling based on burst time
- **Priority Scheduling** - Non-preemptive scheduling based on process priority
- **Round Robin (RR)** - Preemptive scheduling with configurable time quantum

### Interactive Features

- **Process Management**: Add, remove, and manage processes with custom parameters
- **Real-time Visualization**: Interactive Gantt chart showing process execution timeline
- **Performance Metrics**: Calculate and display waiting time, turnaround time, and completion time
- **Demo Data**: Pre-loaded datasets for quick testing of algorithms
- **Responsive Design**: Modern UI that works on all devices
- **Dark/Light Theme**: Toggle between themes for better user experience

### Visual Components

- **Enhanced Gantt Chart**: Animated timeline visualization with process execution blocks
- **Process Results Table**: Detailed breakdown of process execution metrics
- **Statistics Dashboard**: Average performance metrics and execution summary
- **Algorithm Comparison**: Side-by-side comparison of different scheduling approaches

## 🏗️ Architecture

### Backend (Spring Boot)

```
src/main/java/com/scheduler/cpu_simulator/
├── CpuSimulatorApplication.java     # Main application entry point
├── controller/
│   ├── SchedulerController.java     # REST API endpoints
│   └── SimulationRequest.java       # Request DTOs
├── model/
│   └── Process.java                 # Process entity model
└── service/
    └── SchedulerService.java        # Core scheduling algorithms
```

### Frontend (Next.js)

```
cpu-scheduler-frontend/src/
├── app/
│   ├── page.tsx                     # Main application page
│   ├── layout.tsx                   # Root layout component
│   └── globals.css                  # Global styles
├── components/
│   ├── ui/                          # Reusable UI components
│   ├── DemoDataLoader.tsx           # Demo data management
│   ├── EnhancedGanttChart.tsx       # Advanced Gantt visualization
│   ├── GanttChart.tsx               # Basic Gantt chart
│   ├── ProcessInputForm.tsx         # Process input interface
│   ├── ProcessTable.tsx             # Process management table
│   ├── ResultsTable.tsx             # Results display
│   ├── SimpleProcessInput.tsx       # Simplified input form
│   └── ThemeToggle.tsx              # Theme switcher
├── contexts/
│   └── ThemeContext.tsx             # Theme management
├── lib/
│   ├── api.ts                       # API client for backend communication
│   └── utils.ts                     # Utility functions
├── styles/
│   └── EnhancedGantt.module.css     # Gantt chart specific styles
└── types/
    └── process.ts                   # TypeScript type definitions
```

## 🛠️ Technology Stack

### Backend

- **Java 21** - Modern Java features and performance
- **Spring Boot 3.5.3** - Enterprise-grade framework
- **Spring Web** - REST API development
- **Spring DevTools** - Development productivity
- **Maven** - Dependency management and build tool
- **Lombok** - Boilerplate code reduction

### Frontend

- **Next.js 15** - React framework with server-side rendering
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Maven Wrapper** - Maven version management

## 📋 Prerequisites

- **Java 21** or higher
- **Node.js 18+** and npm
- **Maven 3.6+** (or use included Maven wrapper)
- **Git** for version control

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Bhavesh0577/CpuSchedulingSimulator.git
cd CpuSchedulingSimulator
```

### 2. Backend Setup (Spring Boot)

```bash
# Navigate to project root
cd CpuSchedulingSimulator

# Build and run using Maven wrapper (recommended)
./mvnw spring-boot:run

# Or if you have Maven installed globally
mvn spring-boot:run

# Backend will start on http://localhost:8080
```

### 3. Frontend Setup (Next.js)

```bash
# Navigate to frontend directory
cd cpu-scheduler-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Frontend will start on http://localhost:3000
```

## 🎯 Usage Guide

### Getting Started

1. **Launch the Application**: Start both backend and frontend servers
2. **Access the Interface**: Open `http://localhost:3000` in your browser
3. **Select Algorithm**: Choose from FCFS, SJF, Priority, or Round Robin
4. **Configure Settings**: Set time quantum for Round Robin if selected

### Adding Processes

1. **Enter Process Details**:

   - Process ID (e.g., P1, P2, P3)
   - Arrival Time (when process arrives)
   - Burst Time (execution time required)
   - Priority (for Priority scheduling, lower number = higher priority)

2. **Use Demo Data**: Click demo buttons for pre-configured test cases
3. **Manage Processes**: Add, remove, or clear processes as needed

### Running Simulations

1. **Execute Simulation**: Click "Run Simulation" to process your data
2. **View Results**: Analyze the comprehensive results including:
   - Process execution timeline (Gantt chart)
   - Individual process metrics
   - Average waiting and turnaround times
   - Total execution time

### Understanding Results

- **Completion Time**: When process finishes execution
- **Turnaround Time**: Total time from arrival to completion
- **Waiting Time**: Time spent waiting in ready queue
- **Gantt Chart**: Visual timeline of process execution order

## 🔧 API Documentation

### REST Endpoints

#### FCFS Scheduling

```http
POST /api/scheduler/fcfs
Content-Type: application/json

[
  {
    "pid": "P1",
    "arrivalTime": 0,
    "burstTime": 10,
    "priority": 0
  }
]
```

#### SJF Scheduling

```http
POST /api/scheduler/sjf
Content-Type: application/json

[Process Array]
```

#### Priority Scheduling

```http
POST /api/scheduler/priority
Content-Type: application/json

[Process Array]
```

#### Round Robin Scheduling

```http
POST /api/scheduler/rr?quantum=2
Content-Type: application/json

[Process Array]
```

### Data Models

#### Process Model

```typescript
interface Process {
  pid: string; // Process identifier
  arrivalTime: number; // Arrival time
  burstTime: number; // Execution time
  priority: number; // Process priority
  completionTime?: number; // Calculated completion time
  turnaroundTime?: number; // Calculated turnaround time
  waitingTime?: number; // Calculated waiting time
}
```

## 🧪 Algorithm Implementations

### First Come First Served (FCFS)

- **Type**: Non-preemptive
- **Logic**: Execute processes in order of arrival
- **Advantage**: Simple implementation, no starvation
- **Disadvantage**: High average waiting time

### Shortest Job First (SJF)

- **Type**: Non-preemptive
- **Logic**: Execute shortest process first
- **Advantage**: Minimum average waiting time
- **Disadvantage**: Starvation possible for long processes

### Priority Scheduling

- **Type**: Non-preemptive
- **Logic**: Execute highest priority process first
- **Advantage**: Important processes get preference
- **Disadvantage**: Starvation possible for low priority processes

### Round Robin (RR)

- **Type**: Preemptive
- **Logic**: Each process gets fixed time quantum
- **Advantage**: Fair time sharing, no starvation
- **Disadvantage**: High context switching overhead

## 🎨 UI Components

### Main Interface

- **Algorithm Selector**: Dropdown to choose scheduling algorithm
- **Process Input Form**: Interactive form for process data entry
- **Process List**: Dynamic list of added processes
- **Control Panel**: Simulation controls and statistics

### Visualization Components

- **Enhanced Gantt Chart**: Animated timeline with process blocks
- **Results Table**: Detailed metrics for each process
- **Statistics Cards**: Summary of performance metrics
- **Theme Toggle**: Dark/light mode switcher

## 📊 Performance Metrics

### Calculated Metrics

- **Completion Time**: `arrival_time + burst_time + waiting_time`
- **Turnaround Time**: `completion_time - arrival_time`
- **Waiting Time**: `turnaround_time - burst_time`
- **Average Waiting Time**: `sum(waiting_times) / process_count`
- **Average Turnaround Time**: `sum(turnaround_times) / process_count`

### Algorithm Comparison

The application allows you to compare different algorithms by:

- Running same process set with different algorithms
- Observing different execution patterns
- Comparing performance metrics
- Understanding trade-offs between algorithms

## 🔧 Development

### Backend Development

```bash
# Run in development mode
./mvnw spring-boot:run

# Run tests
./mvnw test

# Build for production
./mvnw clean package
```

### Frontend Development

```bash
# Development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Production build
npm run build
npm start
```

### Environment Configuration

- **Backend Port**: 8080 (configurable in `application.properties`)
- **Frontend Port**: 3000 (configurable in `next.config.ts`)
- **API Base URL**: `http://localhost:8080/api/scheduler`

## 🤝 Contributing

1. **Fork the Repository**
2. **Create Feature Branch**: `git checkout -b feature/AmazingFeature`
3. **Commit Changes**: `git commit -m 'Add some AmazingFeature'`
4. **Push to Branch**: `git push origin feature/AmazingFeature`
5. **Open Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure cross-platform compatibility

## 🐛 Troubleshooting

### Common Issues

#### Backend Issues

- **Port 8080 already in use**: Change port in `application.properties`
- **Java version mismatch**: Ensure Java 21+ is installed
- **Maven build fails**: Use Maven wrapper `./mvnw` instead of `mvn`

#### Frontend Issues

- **Node version**: Ensure Node.js 18+ is installed
- **Dependencies**: Run `npm install` in the frontend directory
- **Build failures**: Clear `.next` folder and rebuild

#### Connection Issues

- **API calls failing**: Verify backend is running on port 8080
- **CORS errors**: Backend has CORS enabled for all origins
- **Network issues**: Check firewall and network settings

### Debug Mode

- **Backend**: Add `--debug` flag when running Spring Boot
- **Frontend**: Next.js provides detailed error messages in development mode


## 📈 Future Enhancements

- **Additional Algorithms**: SRTF, Multi-level Queue, Multi-level Feedback Queue
- **Advanced Features**: Process aging, deadline scheduling
- **Export Functionality**: Save results as PDF or CSV
- **Real-time Comparison**: Side-by-side algorithm comparison
- **Mobile App**: React Native implementation
- **Performance Analytics**: Detailed performance analysis tools

## 📞 Support

For support and questions:

- **GitHub Issues**: [Create an issue](https://github.com/samscam18/CpuSchedulingSimulator/issues)
- **Email**: samarthfirangi44@gmail.com
- **Documentation**: Check this README and inline code comments

---

**Happy Scheduling! 🎯**
