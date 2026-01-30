# Product Requirements Document (PRD) Summary
## Aviation Operations Dashboard - AIMS Data Analysis System

---

## 1. Product Overview

### Vision
Trở thành trung tâm điều hành hàng không, cho phép ra quyết định dựa trên dữ liệu để tối ưu hóa việc sử dụng đội bay, cải thiện hiệu suất đúng giờ và giảm chi phí vận hành.

### Key Objectives
- ✅ Cung cấp khả năng hiển thị real-time về chỉ số sử dụng tàu bay
- ✅ Cho phép nhận diện sớm các sự cố vận hành
- ✅ Tối ưu hóa lập lịch phi hành đoàn và phân bổ nguồn lực
- ✅ Giảm 80% thởi gian báo cáo thủ công
- ✅ Hỗ trợ ra quyết định dựa trên phân tích xu hướng lịch sử

### Success Criteria
| Metric | Target |
|--------|--------|
| Giảm tỷ lệ thay đổi tàu bay | 15% trong 6 tháng |
| Cải thiện hiệu suất sử dụng phi hành đoàn | 10% |
| Giảm thởi gian báo cáo thủ công | 80% |
| Uptime hệ thống | 99.5% |

---

## 2. Target Users

| User Group | Role | Primary Use Case |
|------------|------|------------------|
| **Operations** | Network Operations Manager | Theo dõi vận hành hàng ngày, phát hiện sự cố |
| **Crew Scheduling** | Crew Coordinator | Tối ưu phân bổ phi hành đoàn, theo dõi layover |
| **Fleet Planning** | Fleet Manager | Phân tích sử dụng tàu bay, lập kế hoạch năng lực |
| **Executive** | VP Operations | KPI cấp cao, quyết định chiến lược |

---

## 3. User Personas

### 👤 Persona 1: Operations Manager - Minh
- **Mục tiêu**: Theo dõi vận hành, phát hiện sự cố sớm, tối ưu phân bổ đội bay
- **Pain Points**: Thiếu visibility real-time, dựa vào báo cáo Excel thủ công
- **Needs**: Dashboard KPI, cảnh báo tự động, phân tích xu hướng

### 👤 Persona 2: Crew Scheduler - Linh
- **Mục tiêu**: Tối ưu crew pairings, giảm layovers, đảm bảo tuân thủ
- **Pain Points**: Khó theo dõi deadheading, không có visibility về xu hướng
- **Needs**: Crew metrics dashboard, phân tích layover, theo dõi deadhead

### 👤 Persona 3: Fleet Manager - Tuan
- **Mục tiêu**: Tối đa hóa sử dụng tàu bay, theo dõi lịch bảo dưỡng
- **Pain Points**: Không thể dễ dàng so sánh giờ bay thương mại vs tổng
- **Needs**: Báo cáo sử dụng tàu bay, phân tích block hour, theo dõi AC change

---

## 4. Functional Requirements

### Dashboard Widgets

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-001 | **Sector Count Widget** - Hiển thị tổng số sector trong khoảng thởi gian | High |
| FR-002 | **AC Change Widget** - Theo dõi tần suất thay đổi tàu bay | High |
| FR-003 | **Block Hours Comparison** - So sánh commercial vs total block hours | High |
| FR-004 | **Layover Trend Chart** - Biểu đồ xu hướng layover (domestic/intl) | Medium |
| FR-005 | **Deadheading Analysis** - Theo dõi deadheading crew theo tuần | Medium |

### Data Management

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-006 | Upload CSV/Excel files từ AIMS | High |
| FR-007 | Validate file format và headers | High |
| FR-008 | Hiển thị trạng thái xử lý ETL | Medium |
| FR-009 | Xem lịch sử upload và audit logs | Medium |
| FR-010 | Báo cáo lỗi với chi tiết từng dòng | High |

### Reporting Features

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-011 | Export dashboard data ra Excel/CSV | Medium |
| FR-012 | Lập lịch báo cáo tự động hàng ngày | Low |
| FR-013 | Tạo báo cáo PDF | Medium |
| FR-014 | Phân phối báo cáo qua email | Low |

---

## 5. Non-Functional Requirements

| Category | Requirement | Target |
|----------|-------------|--------|
| **Performance** | Dashboard load time | < 3 seconds |
| **Performance** | Widget refresh time | < 2 seconds |
| **Performance** | Chart render time | < 1 second |
| **Availability** | System uptime | > 99.5% |
| **Security** | User authentication | SSO/LDAP |
| **Security** | Role-based access control | 4 roles |
| **Scalability** | Concurrent users | 50+ |
| **Data** | Daily data volume | 100K+ records |

---

## 6. User Stories

### Operations Manager Stories

| ID | Story |
|----|-------|
| US-001 | Là Operations Manager, tôi muốn xem tổng số sectors bay hôm nay |
| US-002 | Là Operations Manager, tôi muốn xem xu hướng tỷ lệ thay đổi tàu bay |
| US-003 | Là Operations Manager, tôi muốn nhận diện các chuyến bay delay > 30 phút |
| US-004 | Là Operations Manager, tôi muốn so sánh hiệu suất hôm nay vs tuần trước |

### Crew Scheduler Stories

| ID | Story |
|----|-------|
| US-005 | Là Crew Scheduler, tôi muốn theo dõi thởi gian layover trung bình |
| US-006 | Là Crew Scheduler, tôi muốn xem số lượng deadheading crew theo tuần |
| US-007 | Là Crew Scheduler, tôi muốn so sánh layover domestic vs international |
| US-008 | Là Crew Scheduler, tôi muốn nhận diện các crew có layover quá mức |

### Fleet Manager Stories

| ID | Story |
|----|-------|
| US-009 | Là Fleet Manager, tôi muốn xem commercial vs total block hours |
| US-010 | Là Fleet Manager, tôi muốn theo dõi sử dụng tàu bay theo loại |
| US-011 | Là Fleet Manager, tôi muốn xem tần suất AC change theo tàu bay |
| US-012 | Là Fleet Manager, tôi muốn phân tích xu hướng sử dụng theo thởi gian |

---

## 7. UI/UX Requirements

### Design System

| Element | Color Code | Usage |
|---------|------------|-------|
| Background | `#1A252F` | Main dashboard background |
| Primary | `#2C3E50` | Cards, containers |
| Accent 1 (Teal) | `#1ABC9C` | Positive metrics, success |
| Accent 2 (Orange) | `#E67E22` | Warnings, alerts |
| Text | `#ECF0F1` | Primary text color |

### Responsive Design
- **Desktop (1920x1080)**: Full dashboard với tất cả widgets
- **Laptop (1366x768)**: Layout thu gọn với scrollable sections
- **Tablet (1024x768)**: Widgets xếp chồng, touch-optimized

### Accessibility
- WCAG 2.1 AA compliance
- Hỗ trợ keyboard navigation
- Tương thích screen reader
- Color contrast ratio >= 4.5:1

---

## 8. Data Requirements

### Data Sources

| File Name | Format | Update Frequency |
|-----------|--------|------------------|
| Flight Operations | CSV/XLSX | Daily |
| Aircraft Swap Log | CSV/XLSX | Daily |
| Crew Integration | CSV/XLSX | Daily |

### Data Retention

| Data Type | Retention Period |
|-----------|------------------|
| Raw uploaded files | 90 days |
| Processed flight data | 2 years |
| Audit logs | 5 years |
| Aggregated metrics | Indefinite |

---

## 9. Timeline & Milestones

| Phase | Duration | Timeline | Deliverables |
|-------|----------|----------|--------------|
| Phase 1 | 4 weeks | Feb 2026 | Requirements, Design, Setup |
| Phase 2 | 6 weeks | Mar-Apr 2026 | Backend, API, ETL Pipeline |
| Phase 3 | 4 weeks | Apr-May 2026 | Frontend, Dashboard, Charts |
| Phase 4 | 3 weeks | May-Jun 2026 | Testing, Bug fixes, UAT |
| Phase 5 | 2 weeks | Jun 2026 | Deployment, Training, Go-live |

**Total Duration**: 19 weeks (~5 months)

---

## 10. Success Metrics

### Product Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Daily Active Users | > 30 | Unique logins per day |
| Feature Adoption | > 80% | Users accessing all widgets |
| User Satisfaction | > 4.0/5 | Quarterly survey |
| Report Generation | > 50/day | Automated reports sent |

### Technical Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Page Load Time | < 3 sec | Time to interactive |
| API Response Time | < 500ms | 95th percentile |
| System Uptime | > 99.5% | Monthly availability |
| Error Rate | < 1% | Failed requests/total |

### Business Metrics

- 15% giảm tỷ lệ thay đổi tàu bay trong 6 tháng
- 10% cải thiện hiệu suất sử dụng phi hành đoàn
- 80% giảm thởi gian báo cáo thủ công
- 20% giảm độ trễ trong ra quyết định vận hành

---

## Document Information

| Field | Value |
|-------|-------|
| Document Type | Product Requirements Document (PRD) |
| Version | 1.0 |
| Date | January 2026 |
| Status | Draft for Review |
| Author | Aviation Operations Team |

---

*This document is confidential and intended for internal use only.*
