# Data Workflow Design - Aviation Operations Dashboard

## Tổng quan kiến trúc

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DATA WORKFLOW ARCHITECTURE                          │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  AIMS System │────▶│   Data       │────▶│    ETL       │────▶│   Data       │
│   Export     │     │  Ingestion   │     │ Processing   │     │   Storage    │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
                                                                      │
                                                                      ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│     User     │◀────│    React     │◀────│  REST API    │◀────│    Redis     │
│  Dashboard   │     │  Frontend    │     │   Server     │     │    Cache     │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

## 1. Data Ingestion Layer

### File Upload API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/upload/flights` | POST | Upload Flight Operations file |
| `/api/upload/swaps` | POST | Upload Aircraft Swap Log file |
| `/api/upload/crew` | POST | Upload Crew Integration file |
| `/api/upload/status/{jobId}` | GET | Check ETL job status |

### Validation Process

1. **File Format Check**: CSV, XLSX, XLS only
2. **Required Headers**: Verify all mandatory columns present
3. **Data Type Validation**: Check column data types
4. **File Size Limit**: Max 50MB per file
5. **Virus Scan**: Security check before processing

## 2. ETL Processing Pipeline

```
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│  FILE   │──▶│  PARSE  │──▶│  CLEAN  │──▶│BUSINESS │──▶│ DEDUPE  │
│ UPLOAD  │   │  DATA   │   │  DATA   │   │  RULES  │   │  DATA   │
└─────────┘   └─────────┘   └─────────┘   └─────────┘   └─────────┘
                                                              │
                        ┌─────────────────────────────────────┘
                        ▼
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│  AUDIT  │◀──│  LOAD   │◀──│ DERIVED │◀──│  CACHE  │
│   LOG   │   │   DB    │   │ METRICS │   │ UPDATE  │
└─────────┘   └─────────┘   └─────────┘   └─────────┘
```

### Derived Metrics

| Metric | Formula | Description |
|--------|---------|-------------|
| `block_hours` | `ATA - ATD` | Actual flight time in hours |
| `delay_minutes` | `MAX(0, ATD - STD)` | Departure delay |
| `swap_flag` | `planned != actual` | Aircraft change indicator |
| `layover_hours` | `next_duty - duty_end` | Crew layover time |

## 3. Database Schema

### Core Tables

```sql
-- flights: Flight operations data
CREATE TABLE flights (
    flight_id VARCHAR(20),
    flight_date DATE,
    tail_number VARCHAR(10),
    ac_type VARCHAR(10),
    std TIMESTAMP,
    sta TIMESTAMP,
    atd TIMESTAMP,
    ata TIMESTAMP,
    origin VARCHAR(10),
    destination VARCHAR(10),
    commercial_ind BOOLEAN,
    block_hours DECIMAL(5,2),
    delay_minutes INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (flight_id, flight_date)
);

-- aircraft_swaps: Aircraft substitution records
CREATE TABLE aircraft_swaps (
    swap_id SERIAL PRIMARY KEY,
    flight_id VARCHAR(20),
    flight_date DATE,
    planned_tail VARCHAR(10),
    actual_tail VARCHAR(10),
    swap_reason VARCHAR(100),
    swap_timestamp TIMESTAMP
);

-- crew_pairings: Crew duty assignments
CREATE TABLE crew_pairings (
    pairing_id VARCHAR(20) PRIMARY KEY,
    crew_id VARCHAR(20),
    duty_start TIMESTAMP,
    duty_end TIMESTAMP,
    deadhead_ind BOOLEAN,
    flight_id VARCHAR(20),
    base_location VARCHAR(10)
);
```

### Relationships

- `flights` → `aircraft_swaps` (1:N via flight_id)
- `flights` → `crew_pairings` (1:N via flight_id)
- `aircraft_master` → `flights` (1:N via tail_number)

## 4. API Layer

### KPI Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/kpi/sectors` | Sector count for date range |
| `GET /api/kpi/ac-changes` | Aircraft change metrics |
| `GET /api/kpi/block-hours` | Commercial vs total block hours |
| `GET /api/kpi/layovers` | Average layover statistics |
| `GET /api/kpi/deadheads` | Deadheading crew count |

### Chart Data Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/charts/sectors-trend` | Sector count trend data |
| `GET /api/charts/layover-trend` | Layover trend by type |
| `GET /api/charts/deadhead-trend` | Deadheading trend |

### Caching Strategy

| Query Type | Cache Time | Stale Time |
|------------|------------|------------|
| KPI metrics | 5 minutes | 2 minutes |
| Chart data | 10 minutes | 5 minutes |
| Flight details | 2 minutes | 1 minute |
| Filter options | 30 minutes | 15 minutes |

## 5. Frontend Data Flow

### React Query Integration

```typescript
// KPI Query Hook
const useKPISectors = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ['kpi', 'sectors', startDate, endDate],
    queryFn: () => fetchSectors(startDate, endDate),
    staleTime: 2 * 60 * 1000,  // 2 minutes
    cacheTime: 5 * 60 * 1000,   // 5 minutes
  });
};

// Chart Data Query Hook
const useChartData = (chartType: string, startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ['chart', chartType, startDate, endDate],
    queryFn: () => fetchChartData(chartType, startDate, endDate),
    staleTime: 5 * 60 * 1000,   // 5 minutes
    cacheTime: 10 * 60 * 1000,  // 10 minutes
  });
};
```

### State Management

```
┌─────────────────────────────────────────────────────────┐
│                    STATE ARCHITECTURE                   │
├─────────────────────────────────────────────────────────┤
│  Global State (React Context)                           │
│  ├── Date range filter (start_date, end_date)          │
│  ├── Selected aircraft types                            │
│  └── User preferences (theme, timezone)                 │
├─────────────────────────────────────────────────────────┤
│  Server State (React Query)                             │
│  ├── KPI metrics data                                   │
│  ├── Chart datasets                                     │
│  └── Flight details                                     │
├─────────────────────────────────────────────────────────┤
│  Component State (useState)                             │
│  ├── UI interactions (modals, dropdowns)               │
│  ├── Form inputs                                        │
│  └── Loading indicators                                 │
└─────────────────────────────────────────────────────────┘
```

## 6. Error Handling

### Error Categories

| Category | Examples | Handling |
|----------|----------|----------|
| Validation | Missing headers, invalid format | Reject file, notify user |
| Business Rule | ATA < ATD, future dates | Quarantine record, log error |
| System | DB connection, timeout | Retry 3x, then alert |
| Data Quality | Outliers, missing values | Flag for review |

### Alert Thresholds

- **ETL failure rate > 5%**: Email alert to ops team
- **Validation error rate > 10%**: Data quality warning
- **API response time > 2s**: Performance alert

## 7. Monitoring Metrics

- ETL job success/failure rates
- Data validation error trends
- API response times and error rates
- Database performance metrics
- Dashboard user activity

## Files Generated

1. `data_workflow_diagram.png` - End-to-end workflow architecture
2. `etl_pipeline_diagram.png` - ETL processing pipeline
3. `database_schema_diagram.png` - PostgreSQL schema
4. `api_sequence_diagram.png` - API request sequence
5. `Data_Workflow_Design.docx` - Full documentation

---

**Version**: 1.0  
**Date**: January 2026  
**Author**: Aviation Operations Team
