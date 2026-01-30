# Quick Start Guide - Aviation Operations Dashboard

> **For AI**: Implement this project step by step following the phases below.

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Create Project Structure
```bash
mkdir aviation-dashboard && cd aviation-dashboard
mkdir backend frontend database docs
```

### Step 2: Setup Backend
```bash
cd backend
npm init -y
npm install express cors dotenv pg sequelize redis bull multer csv-parser xlsx winston bcryptjs jsonwebtoken
npm install --save-dev nodemon jest supertest
```

### Step 3: Setup Frontend
```bash
cd ../frontend
npm create vite@latest . -- --template react-ts
npm install
npm install tailwindcss postcss autoprefixer react-query axios chart.js react-chartjs-2 react-router-dom lucide-react date-fns
npx tailwindcss init -p
```

### Step 4: Setup Database
```bash
# PostgreSQL
createdb aviation_dashboard

# Redis (Docker)
docker run -d -p 6379:6379 redis:7-alpine
```

---

## 📋 Implementation Checklist

### Phase 1: Backend Core (Week 1-2)
- [ ] Setup Express app with middleware
- [ ] Create database models (Flight, AircraftSwap, CrewPairing)
- [ ] Implement file upload endpoints
- [ ] Create KPI endpoints (/api/kpi/*)
- [ ] Add authentication middleware

### Phase 2: ETL Pipeline (Week 2-3)
- [ ] Create file parser service (CSV/Excel)
- [ ] Implement validation service
- [ ] Setup Bull queue for ETL jobs
- [ ] Create ETL processor with deduplication
- [ ] Add audit logging

### Phase 3: Frontend Dashboard (Week 3-4)
- [ ] Setup React + Tailwind + React Query
- [ ] Create dashboard layout with sidebar
- [ ] Implement KPI widgets (SectorCount, ACChange, BlockHours)
- [ ] Add date range filter component
- [ ] Create chart components (LayoverTrend, DeadheadTrend)

### Phase 4: Integration & Polish (Week 4-5)
- [ ] Connect frontend to backend APIs
- [ ] Add loading states and error handling
- [ ] Implement dark theme
- [ ] Add responsive design
- [ ] Write tests

---

## 🎯 Critical Path

```
Week 1: Backend Setup + Database
Week 2: ETL Pipeline + API Endpoints  
Week 3: Frontend Setup + Components
Week 4: Charts + Integration
Week 5: Testing + Polish
```

---

## 📁 File Templates

### Backend Entry Point
```javascript
// backend/app.js
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
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
```

### Database Model
```javascript
// backend/models/flight.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Flight', {
    flight_id: { type: DataTypes.STRING(20), primaryKey: true },
    flight_date: { type: DataTypes.DATEONLY, primaryKey: true },
    tail_number: DataTypes.STRING(10),
    ac_type: DataTypes.STRING(10),
    std: DataTypes.DATE,
    sta: DataTypes.DATE,
    atd: DataTypes.DATE,
    ata: DataTypes.DATE,
    commercial_ind: DataTypes.BOOLEAN,
    block_hours: DataTypes.DECIMAL(5, 2),
    delay_minutes: DataTypes.INTEGER
  }, { tableName: 'flights', timestamps: true, underscored: true });
};
```

### React Widget Component
```tsx
// frontend/src/components/Widgets/SectorCountWidget.tsx
import { useQuery } from 'react-query';
import { kpiApi } from '../../services/api';

const SectorCountWidget = ({ startDate, endDate }) => {
  const { data } = useQuery(
    ['sectors', startDate, endDate],
    () => kpiApi.getSectorCount(startDate, endDate),
    { staleTime: 2 * 60 * 1000 }
  );

  return (
    <div className="bg-[#2C3E50] rounded-lg p-6">
      <p className="text-gray-400 text-sm">Total Sectors</p>
      <h3 className="text-3xl font-bold text-white mt-2">
        {data?.data?.count?.toLocaleString() || 0}
      </h3>
    </div>
  );
};

export default SectorCountWidget;
```

---

## 🔑 Key Requirements

### Must Have (MVP)
1. ✅ Upload CSV/Excel files from AIMS
2. ✅ Display Sector Count KPI
3. ✅ Display AC Change KPI
4. ✅ Display Block Hours KPI
5. ✅ Date range filter (1-32 days)
6. ✅ Dark theme dashboard

### Should Have (Phase 2)
1. Layover trend chart
2. Deadheading analysis
3. Export to Excel/PDF
4. User authentication

### Nice to Have (Phase 3)
1. Scheduled reports
2. Email notifications
3. Mobile responsive

---

## 📊 Success Metrics

| Metric | Target |
|--------|--------|
| Dashboard Load Time | < 3 seconds |
| API Response Time | < 500ms |
| System Uptime | > 99.5% |
| User Adoption | > 80% |

---

## 🐛 Common Issues

### Issue 1: Database Connection Failed
```bash
# Check PostgreSQL is running
sudo service postgresql status

# Create database if not exists
createdb aviation_dashboard
```

### Issue 2: Redis Connection Failed
```bash
# Start Redis with Docker
docker run -d -p 6379:6379 redis:7-alpine

# Or install locally
sudo apt-get install redis-server
```

### Issue 3: CORS Error
```javascript
// Add to backend/app.js
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

---

## 📚 Reference Documents

| Document | Purpose |
|----------|---------|
| `README.md` | Full implementation guide |
| `Business_Requirements_Document.docx` | Business case & ROI |
| `Product_Requirements_Document.docx` | User stories & features |
| `Aviation_Dashboard_Technical_Specification.docx` | Technical specs |
| `Data_Workflow_Design.docx` | Data flow architecture |

---

**Start implementing from Phase 1 → Phase 4**
