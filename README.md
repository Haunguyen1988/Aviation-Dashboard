# Aviation Operations Dashboard - AI Implementation Guide

> **Project**: Aviation Operations Dashboard - AIMS Data Analysis System  
> **Version**: 1.0  
> **Date**: January 2026  
> **Status**: Ready for Implementation

---

## 📋 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture Overview](#2-architecture-overview)
3. [Phase 1: Setup & Infrastructure](#3-phase-1-setup--infrastructure)
4. [Phase 2: Backend Development](#4-phase-2-backend-development)
5. [Phase 3: Database & ETL](#5-phase-3-database--etl)
6. [Phase 4: Frontend Development](#6-phase-4-frontend-development)
7. [Phase 5: Testing & QA](#7-phase-5-testing--qa)
8. [Phase 6: Deployment](#8-phase-6-deployment)
9. [Key Documents](#9-key-documents)
10. [Quick Reference](#10-quick-reference)

---

## 1. Project Overview

### 1.1 Vision
Trở thành trung tâm điều hành hàng không, cho phép ra quyết định dựa trên dữ liệu để tối ưu hóa việc sử dụng đội bay, cải thiện hiệu suất đúng giờ và giảm chi phí vận hành.

### 1.2 Business Objectives
| Objective | Target | Timeline |
|-----------|--------|----------|
| Giảm tỷ lệ thay đổi tàu bay | 15% | 6 tháng |
| Cải thiện hiệu quả sử dụng phi hành đoàn | 10% | 6 tháng |
| Giảm thởi gian báo cáo thủ công | 80% | 3 tháng |
| Uptime hệ thống | 99.5% | Ongoing |

### 1.3 ROI Analysis
- **Total Investment**: $180,000
- **Annual Benefits**: $285,000
- **Payback Period**: 8 months
- **3-Year ROI**: 375%

### 1.4 Tech Stack
```
Frontend:    React 18 + TypeScript + Tailwind CSS + Chart.js
Backend:     Node.js/Express OR Python/FastAPI
Database:    PostgreSQL 15+
Cache:       Redis 7+
File Store:  AWS S3 / Local Storage
```

---

## 2. Architecture Overview

### 2.1 System Architecture
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SYSTEM ARCHITECTURE                            │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌──────────────┐
    │  AIMS System │◀── CSV/XLSX Export
    │   (Source)   │
    └──────┬───────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DATA INGESTION LAYER                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ File Upload │─▶│ Validation  │─▶│   Queue     │─▶│ ETL Trigger │        │
│  │    API      │  │   Engine    │  │  (Bull)     │  │             │        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ETL PROCESSING LAYER                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │    Parse    │─▶│    Clean    │─▶│  Transform  │─▶│   Deduplicate│       │
│  │             │  │             │  │             │  │              │       │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                       │                                      │
│                                       ▼                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                         │
│  │   Derived   │─▶│   Load to   │─▶│Cache Update │                         │
│  │   Metrics   │  │     DB      │  │   (Redis)   │                         │
│  └─────────────┘  └─────────────┘  └─────────────┘                         │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DATA STORAGE LAYER                             │
│                                                                             │
│   ┌─────────────────┐      ┌─────────────────┐                             │
│   │   PostgreSQL    │◀────▶│  Redis Cache    │                             │
│   │  (Primary DB)   │      │  (Performance)  │                             │
│   └─────────────────┘      └─────────────────┘                             │
│                                                                             │
│   Tables: flights, aircraft_swaps, crew_pairings, etl_audit_log            │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                               API LAYER                                     │
│                                                                             │
│   REST Endpoints:                                                           │
│   ├── /api/upload/*      (File upload)                                     │
│   ├── /api/kpi/*         (KPI metrics)                                     │
│   ├── /api/charts/*      (Chart data)                                      │
│   └── /api/reports/*     (Report generation)                               │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            FRONTEND LAYER                                   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                     React Dashboard                                 │  │
│   │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │  │
│   │  │  Sector  │ │  AC      │ │  Block   │ │  Layover │ │ Deadhead │ │  │
│   │  │  Count   │ │  Change  │ │  Hours   │ │  Trend   │ │  Analysis│ │  │
│   │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Database Schema
```sql
-- Core Tables
flights (flight_id, flight_date, tail_number, ac_type, std, sta, atd, ata, 
         origin, destination, commercial_ind, block_hours, delay_minutes)

aircraft_swaps (swap_id, flight_id, flight_date, planned_tail, actual_tail, 
                swap_reason, swap_timestamp)

crew_pairings (pairing_id, crew_id, duty_start, duty_end, deadhead_ind, 
               flight_id, base_location)

aircraft_master (tail_number, ac_type, ac_family, seat_capacity, status)

etl_audit_log (log_id, file_name, records_processed, records_inserted, 
               records_updated, records_rejected, status)

data_validation_errors (error_id, file_name, row_number, column_name, 
                        error_type, error_message, raw_data)
```

---

## 3. Phase 1: Setup & Infrastructure

### 3.1 Prerequisites
```bash
# Required software
- Node.js 18+ or Python 3.11+
- PostgreSQL 15+
- Redis 7+
- Git
- Docker (optional)
```

### 3.2 Project Structure
```
aviation-dashboard/
├── backend/                    # Backend API
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   ├── controllers/       # API controllers
│   │   ├── models/            # Database models
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   ├── middleware/        # Auth, validation
│   │   ├── utils/             # Helpers
│   │   └── jobs/              # ETL jobs
│   ├── tests/
│   ├── package.json
│   └── .env
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # Custom hooks
│   │   ├── services/          # API services
│   │   ├── store/             # State management
│   │   ├── utils/             # Utilities
│   │   └── styles/            # Tailwind config
│   ├── public/
│   ├── package.json
│   └── .env
│
├── database/                   # Database scripts
│   ├── migrations/
│   ├── seeds/
│   └── schema.sql
│
├── docs/                       # Documentation
│   ├── BRD.md
│   ├── PRD.md
│   ├── Technical_Spec.md
│   └── Data_Workflow.md
│
├── docker-compose.yml
└── README.md
```

### 3.3 Environment Setup
```bash
# 1. Clone repository
git clone <repository-url>
cd aviation-dashboard

# 2. Setup Backend
cd backend
npm install
# OR for Python
pip install -r requirements.txt

# 3. Setup Frontend
cd ../frontend
npm install

# 4. Setup Database
# Create PostgreSQL database
createdb aviation_dashboard

# 5. Run migrations
npm run migrate
# OR
python manage.py migrate

# 6. Start services
# Backend
cd backend && npm run dev
# Frontend
cd frontend && npm run dev
```

### 3.4 Configuration Files
```env
# backend/.env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=aviation_dashboard
DB_USER=postgres
DB_PASSWORD=password
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
FILE_UPLOAD_PATH=./uploads
MAX_FILE_SIZE=52428800

# frontend/.env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME="Aviation Operations Dashboard"
```

---

## 4. Phase 2: Backend Development

### 4.1 API Endpoints (Implementation Order)

#### Priority 1: Core APIs
```
POST   /api/upload/flights          # Upload flight operations file
POST   /api/upload/swaps            # Upload aircraft swap log
POST   /api/upload/crew             # Upload crew integration file
GET    /api/upload/status/:jobId    # Check upload status

GET    /api/kpi/sectors             # Get sector count KPI
GET    /api/kpi/ac-changes          # Get AC change KPI
GET    /api/kpi/block-hours         # Get block hours KPI
GET    /api/kpi/layovers            # Get layover KPI
GET    /api/kpi/deadheads           # Get deadhead KPI
```

#### Priority 2: Chart APIs
```
GET    /api/charts/sectors-trend    # Sector trend data
GET    /api/charts/layover-trend    # Layover trend data
GET    /api/charts/deadhead-trend   # Deadhead trend data
GET    /api/charts/ac-change-trend  # AC change trend data
```

#### Priority 3: Report APIs
```
GET    /api/reports/export          # Export data to Excel/CSV
POST   /api/reports/schedule        # Schedule automated reports
```

### 4.2 Backend Implementation Steps

#### Step 1: Project Setup
```bash
# Initialize Node.js project
mkdir backend && cd backend
npm init -y

# Install dependencies
npm install express cors dotenv bcryptjs jsonwebtoken multer
npm install pg sequelize redis bull winston
npm install --save-dev nodemon jest supertest
```

#### Step 2: Database Models
```javascript
// models/flight.js
module.exports = (sequelize, DataTypes) => {
  const Flight = sequelize.define('Flight', {
    flight_id: { type: DataTypes.STRING(20), primaryKey: true },
    flight_date: { type: DataTypes.DATEONLY, primaryKey: true },
    tail_number: DataTypes.STRING(10),
    ac_type: DataTypes.STRING(10),
    std: DataTypes.DATE,
    sta: DataTypes.DATE,
    atd: DataTypes.DATE,
    ata: DataTypes.DATE,
    origin: DataTypes.STRING(10),
    destination: DataTypes.STRING(10),
    commercial_ind: DataTypes.BOOLEAN,
    block_hours: DataTypes.DECIMAL(5, 2),
    delay_minutes: DataTypes.INTEGER
  }, {
    tableName: 'flights',
    timestamps: true,
    underscored: true
  });
  return Flight;
};
```

#### Step 3: Controllers
```javascript
// controllers/kpiController.js
const { Flight, AircraftSwap, CrewPairing } = require('../models');
const { Op } = require('sequelize');

exports.getSectorCount = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    
    const count = await Flight.count({
      where: {
        flight_date: { [Op.between]: [start_date, end_date] },
        commercial_ind: true
      }
    });
    
    res.json({ success: true, data: { count } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getACChanges = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    
    const count = await AircraftSwap.count({
      where: {
        flight_date: { [Op.between]: [start_date, end_date] }
      }
    });
    
    res.json({ success: true, data: { count } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
```

#### Step 4: Routes
```javascript
// routes/kpiRoutes.js
const express = require('express');
const router = express.Router();
const kpiController = require('../controllers/kpiController');
const { authenticate } = require('../middleware/auth');

router.get('/sectors', authenticate, kpiController.getSectorCount);
router.get('/ac-changes', authenticate, kpiController.getACChanges);
router.get('/block-hours', authenticate, kpiController.getBlockHours);
router.get('/layovers', authenticate, kpiController.getLayovers);
router.get('/deadheads', authenticate, kpiController.getDeadheads);

module.exports = router;
```

#### Step 5: Main App
```javascript
// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/kpi', require('./routes/kpiRoutes'));
app.use('/api/charts', require('./routes/chartRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 5. Phase 3: Database & ETL

### 5.1 Database Migration
```sql
-- migrations/001_create_flights.sql
CREATE TABLE flights (
    flight_id VARCHAR(20) NOT NULL,
    flight_date DATE NOT NULL,
    tail_number VARCHAR(10) NOT NULL,
    ac_type VARCHAR(10) NOT NULL,
    std TIMESTAMP NOT NULL,
    sta TIMESTAMP NOT NULL,
    atd TIMESTAMP NOT NULL,
    ata TIMESTAMP NOT NULL,
    origin VARCHAR(10),
    destination VARCHAR(10),
    commercial_ind BOOLEAN DEFAULT TRUE,
    block_hours DECIMAL(5,2) GENERATED ALWAYS AS (
        EXTRACT(EPOCH FROM (ata - atd)) / 3600
    ) STORED,
    delay_minutes INTEGER GENERATED ALWAYS AS (
        GREATEST(0, EXTRACT(EPOCH FROM (atd - std)) / 60)
    ) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (flight_id, flight_date)
);

CREATE INDEX idx_flights_date ON flights(flight_date);
CREATE INDEX idx_flights_tail ON flights(tail_number);
CREATE INDEX idx_flights_commercial ON flights(flight_date, commercial_ind);
```

### 5.2 ETL Pipeline Implementation

#### Step 1: File Parser Service
```javascript
// services/fileParser.js
const csv = require('csv-parser');
const xlsx = require('xlsx');
const fs = require('fs');

class FileParser {
  async parseCSV(filePath) {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', reject);
    });
  }

  async parseExcel(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(worksheet);
  }
}

module.exports = FileParser;
```

#### Step 2: Validation Service
```javascript
// services/validationService.js
class ValidationService {
  validateFlightRow(row) {
    const errors = [];
    
    if (!row.Flight_ID) errors.push('Flight_ID is required');
    if (!row.Tail_Number) errors.push('Tail_Number is required');
    if (!row.STD) errors.push('STD is required');
    if (!row.ATA) errors.push('ATA is required');
    
    // Temporal validation
    if (row.ATA && row.ATD) {
      const ata = new Date(row.ATA);
      const atd = new Date(row.ATD);
      if (ata < atd) errors.push('ATA cannot be before ATD');
    }
    
    return { valid: errors.length === 0, errors };
  }
}

module.exports = ValidationService;
```

#### Step 3: ETL Job Processor
```javascript
// jobs/etlProcessor.js
const { Queue } = require('bull');
const FileParser = require('../services/fileParser');
const ValidationService = require('../services/validationService');
const { Flight, AircraftSwap, CrewPairing, ETLAuditLog } = require('../models');

const etlQueue = new Queue('etl processing', process.env.REDIS_URL);

etlQueue.process('flight-upload', async (job) => {
  const { filePath, fileName } = job.data;
  const parser = new FileParser();
  const validator = new ValidationService();
  
  let processed = 0, inserted = 0, updated = 0, rejected = 0;
  
  try {
    // Parse file
    const rows = await parser.parseCSV(filePath);
    
    for (const row of rows) {
      processed++;
      
      // Validate
      const validation = validator.validateFlightRow(row);
      if (!validation.valid) {
        rejected++;
        continue;
      }
      
      // Check for existing record (deduplication)
      const existing = await Flight.findOne({
        where: {
          flight_id: row.Flight_ID,
          flight_date: row.Flight_Date
        }
      });
      
      const data = {
        flight_id: row.Flight_ID,
        flight_date: row.Flight_Date,
        tail_number: row.Tail_Number,
        ac_type: row.AC_Type,
        std: row.STD,
        sta: row.STA,
        atd: row.ATD,
        ata: row.ATA,
        origin: row.Origin,
        destination: row.Destination,
        commercial_ind: row.Commercial_Ind === 'Y'
      };
      
      if (existing) {
        await existing.update(data);
        updated++;
      } else {
        await Flight.create(data);
        inserted++;
      }
    }
    
    // Log audit
    await ETLAuditLog.create({
      file_name: fileName,
      records_processed: processed,
      records_inserted: inserted,
      records_updated: updated,
      records_rejected: rejected,
      status: 'SUCCESS'
    });
    
    return { success: true, processed, inserted, updated, rejected };
  } catch (error) {
    await ETLAuditLog.create({
      file_name: fileName,
      records_processed: processed,
      records_inserted: inserted,
      records_updated: updated,
      records_rejected: rejected,
      status: 'FAILED',
      error_message: error.message
    });
    throw error;
  }
});

module.exports = etlQueue;
```

---

## 6. Phase 4: Frontend Development

### 6.1 Project Setup
```bash
# Create Vite React project with TypeScript
cd frontend
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install
npm install tailwindcss postcss autoprefixer
npm install react-query axios chart.js react-chartjs-2
npm install react-router-dom lucide-react date-fns
npm install --save-dev @types/node

# Initialize Tailwind
npx tailwindcss init -p
```

### 6.2 Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#2C3E50',
          dark: '#1A252F',
          light: '#34495E'
        },
        teal: {
          DEFAULT: '#1ABC9C',
          dark: '#16A085'
        },
        orange: {
          DEFAULT: '#E67E22',
          dark: '#D35400'
        }
      }
    },
  },
  plugins: [],
}
```

### 6.3 Main Components (Implementation Order)

#### Priority 1: Layout & Navigation
```tsx
// components/Layout/DashboardLayout.tsx
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-navy-dark text-gray-100">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
```

#### Priority 2: KPI Widgets
```tsx
// components/Widgets/SectorCountWidget.tsx
import { useQuery } from 'react-query';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { kpiApi } from '../../services/api';

interface SectorCountWidgetProps {
  startDate: string;
  endDate: string;
}

const SectorCountWidget = ({ startDate, endDate }: SectorCountWidgetProps) => {
  const { data, isLoading } = useQuery(
    ['sectors', startDate, endDate],
    () => kpiApi.getSectorCount(startDate, endDate),
    { staleTime: 2 * 60 * 1000 }
  );

  if (isLoading) return <div className="animate-pulse h-32 bg-navy rounded-lg" />;

  const count = data?.data?.count || 0;
  const trend = 5.2; // Calculate from previous period

  return (
    <div className="bg-navy rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">Total Sectors</p>
          <h3 className="text-3xl font-bold text-white mt-2">{count.toLocaleString()}</h3>
        </div>
        <div className={`flex items-center ${trend >= 0 ? 'text-teal' : 'text-orange'}`}>
          {trend >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
          <span className="ml-1 font-semibold">{Math.abs(trend)}%</span>
        </div>
      </div>
    </div>
  );
};

export default SectorCountWidget;
```

#### Priority 3: Charts
```tsx
// components/Charts/LayoverTrendChart.tsx
import { Line } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { chartApi } from '../../services/api';

const LayoverTrendChart = ({ startDate, endDate }: ChartProps) => {
  const { data } = useQuery(
    ['layover-trend', startDate, endDate],
    () => chartApi.getLayoverTrend(startDate, endDate),
    { staleTime: 5 * 60 * 1000 }
  );

  const chartData = {
    labels: data?.data?.labels || [],
    datasets: [
      {
        label: 'Domestic',
        data: data?.data?.domestic || [],
        borderColor: '#1ABC9C',
        backgroundColor: 'rgba(26, 188, 156, 0.1)',
        tension: 0.4
      },
      {
        label: 'International',
        data: data?.data?.international || [],
        borderColor: '#E67E22',
        backgroundColor: 'rgba(230, 126, 34, 0.1)',
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Layover Trend Analysis' }
    },
    scales: {
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#ECF0F1' }
      },
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#ECF0F1' }
      }
    }
  };

  return (
    <div className="bg-navy rounded-lg p-6 h-80">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LayoverTrendChart;
```

#### Priority 4: Date Range Filter
```tsx
// components/Filters/DateRangeFilter.tsx
import { useState } from 'react';
import { format, subDays } from 'date-fns';

interface DateRangeFilterProps {
  onChange: (start: string, end: string) => void;
}

const DateRangeFilter = ({ onChange }: DateRangeFilterProps) => {
  const [startDate, setStartDate] = useState(format(subDays(new Date(), 7), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const presets = [
    { label: 'Last 7 Days', days: 7 },
    { label: 'Last 14 Days', days: 14 },
    { label: 'Last 30 Days', days: 30 }
  ];

  const handlePresetClick = (days: number) => {
    const end = new Date();
    const start = subDays(end, days);
    setStartDate(format(start, 'yyyy-MM-dd'));
    setEndDate(format(end, 'yyyy-MM-dd'));
    onChange(format(start, 'yyyy-MM-dd'), format(end, 'yyyy-MM-dd'));
  };

  return (
    <div className="flex items-center gap-4 bg-navy rounded-lg p-4">
      <div className="flex gap-2">
        {presets.map(preset => (
          <button
            key={preset.days}
            onClick={() => handlePresetClick(preset.days)}
            className="px-4 py-2 bg-navy-light rounded hover:bg-teal hover:text-white transition"
          >
            {preset.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="bg-navy-light rounded px-3 py-2"
        />
        <span>to</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="bg-navy-light rounded px-3 py-2"
        />
      </div>
    </div>
  );
};

export default DateRangeFilter;
```

### 6.4 API Service
```typescript
// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Add auth token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// KPI APIs
export const kpiApi = {
  getSectorCount: (start: string, end: string) => 
    api.get(`/kpi/sectors?start_date=${start}&end_date=${end}`),
  getACChanges: (start: string, end: string) => 
    api.get(`/kpi/ac-changes?start_date=${start}&end_date=${end}`),
  getBlockHours: (start: string, end: string) => 
    api.get(`/kpi/block-hours?start_date=${start}&end_date=${end}`),
  getLayovers: (start: string, end: string) => 
    api.get(`/kpi/layovers?start_date=${start}&end_date=${end}`),
  getDeadheads: (start: string, end: string) => 
    api.get(`/kpi/deadheads?start_date=${start}&end_date=${end}`)
};

// Chart APIs
export const chartApi = {
  getLayoverTrend: (start: string, end: string) => 
    api.get(`/charts/layover-trend?start_date=${start}&end_date=${end}`),
  getSectorTrend: (start: string, end: string) => 
    api.get(`/charts/sectors-trend?start_date=${start}&end_date=${end}`)
};

export default api;
```

---

## 7. Phase 5: Testing & QA

### 7.1 Testing Strategy
```
Unit Tests (Jest) ──▶ Integration Tests ──▶ E2E Tests (Cypress)
    │                       │                      │
    ▼                       ▼                      ▼
Components              API Endpoints         User Flows
Utils                   Database              Critical Paths
Services                ETL Pipeline
```

### 7.2 Unit Tests Example
```javascript
// tests/kpiController.test.js
const request = require('supertest');
const app = require('../app');
const { Flight } = require('../models');

describe('KPI Controller', () => {
  describe('GET /api/kpi/sectors', () => {
    it('should return sector count for date range', async () => {
      // Seed test data
      await Flight.bulkCreate([
        { flight_id: 'VN001', flight_date: '2026-01-15', tail_number: 'VN-A888', commercial_ind: true },
        { flight_id: 'VN002', flight_date: '2026-01-15', tail_number: 'VN-A889', commercial_ind: true }
      ]);

      const response = await request(app)
        .get('/api/kpi/sectors?start_date=2026-01-01&end_date=2026-01-31')
        .set('Authorization', `Bearer ${testToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.count).toBe(2);
    });
  });
});
```

### 7.3 E2E Tests Example
```javascript
// cypress/e2e/dashboard.cy.js
describe('Dashboard', () => {
  beforeEach(() => {
    cy.login('test@airline.com', 'password');
    cy.visit('/dashboard');
  });

  it('should display KPI widgets', () => {
    cy.get('[data-testid="sector-count-widget"]').should('be.visible');
    cy.get('[data-testid="ac-change-widget"]').should('be.visible');
    cy.get('[data-testid="block-hours-widget"]').should('be.visible');
  });

  it('should update widgets when date range changes', () => {
    cy.get('[data-testid="date-range-filter"]').within(() => {
      cy.contains('Last 7 Days').click();
    });
    
    cy.get('[data-testid="sector-count-widget"]')
      .should('contain', 'Total Sectors');
  });
});
```

### 7.4 Test Commands
```bash
# Run unit tests
npm test

# Run with coverage
npm run test:coverage

# Run E2E tests
npm run cypress:run

# Open Cypress UI
npm run cypress:open
```

---

## 8. Phase 6: Deployment

### 8.1 Docker Configuration
```dockerfile
# Dockerfile (Backend)
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
```

```dockerfile
# Dockerfile (Frontend)
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: aviation_dashboard
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  backend:
    build: ./backend
    environment:
      NODE_ENV: production
      DB_HOST: postgres
      REDIS_URL: redis://redis:6379
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - redis

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

### 8.2 Deployment Commands
```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f backend

# Scale backend
docker-compose up -d --scale backend=3

# Stop all
docker-compose down
```

---

## 9. Key Documents

| Document | File | Description |
|----------|------|-------------|
| **Business Requirements** | `Business_Requirements_Document.docx` | BRD với ROI analysis |
| **Product Requirements** | `Product_Requirements_Document.docx` | PRD với user stories |
| **Technical Specification** | `Aviation_Dashboard_Technical_Specification.docx` | Đặc tả kỹ thuật chi tiết |
| **Data Workflow** | `Data_Workflow_Design.docx` | Thiết kế workflow dữ liệu |
| **BRD Summary** | `BRD_SUMMARY.md` | Tóm tắt BRD |
| **PRD Summary** | `PRD_SUMMARY.md` | Tóm tắt PRD |
| **Data Workflow Summary** | `DATA_WORKFLOW_SUMMARY.md` | Tóm tắt workflow |

---

## 10. Quick Reference

### 10.1 API Response Format
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "timestamp": "2026-01-15T08:30:00Z",
  "cache_hit": false
}
```

### 10.2 Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid date format",
    "details": ["start_date must be in YYYY-MM-DD format"]
  },
  "timestamp": "2026-01-15T08:30:00Z"
}
```

### 10.3 Color Palette
```css
/* Theme Colors */
--navy-dark: #1A252F;    /* Background */
--navy: #2C3E50;         /* Cards */
--teal: #1ABC9C;         /* Success/Accent */
--orange: #E67E22;       /* Warning/Alert */
--text: #ECF0F1;         /* Primary text */
```

### 10.4 File Upload Format
```csv
Flight_ID,Tail_Number,AC_Type,STD,STA,ATD,ATA,Commercial_Ind
VN123,VN-A888,A321,2026-01-15 08:00,2026-01-15 10:30,2026-01-15 08:05,2026-01-15 10:25,Y
```

### 10.5 Common Commands
```bash
# Start development
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Deploy with Docker
docker-compose up -d

# View logs
npm run logs
```

---

## 📞 Support

For questions or issues, contact:
- **Project Manager**: [Name] - [Email]
- **Technical Lead**: [Name] - [Email]
- **Business Owner**: [Name] - [Email]

---

**Document Version**: 1.0  
**Last Updated**: January 2026  
**Author**: Aviation Operations Team
