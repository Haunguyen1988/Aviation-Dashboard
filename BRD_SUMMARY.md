# Business Requirements Document (BRD) Summary
## Aviation Operations Dashboard - AIMS Data Analysis System

---

## 1. Executive Summary

### Project Overview
Dự án Aviation Operations Dashboard nhằm chuyển đổi cách hãng hàng không quản lý và phân tích dữ liệu vận hành. Bằng cách tạo nền tảng phân tích tập trung xử lý dữ liệu từ AIMS, chúng tôi sẽ cho phép khả năng hiển thị real-time về việc sử dụng tàu bay, hiệu quả lập lịch phi hành đoàn và hiệu suất mạng bay.

### Key Business Benefits
- ✅ Giảm 15% tỷ lệ thay đổi tàu bay, cải thiện độ tin cậy lịch bay
- ✅ Cải thiện 10% hiệu quả sử dụng phi hành đoàn, giảm chi phí lao động
- ✅ Giảm 80% thởi gian báo cáo thủ công
- ✅ Cho phép ra quyết định dựa trên dữ liệu với phân tích real-time
- ✅ Cải thiện hiệu suất đúng giờ thông qua quản lý gián đoạn chủ động

### Investment Summary

| Item | Value |
|------|-------|
| **Total Investment** | $180,000 |
| **Annual Benefits** | $285,000 |
| **Payback Period** | 8 months |
| **3-Year ROI** | 375% |

---

## 2. Business Context

### Current State (Hiện trạng)
Hiện tại, phân tích dữ liệu vận hành phụ thuộc nhiều vào quy trình thủ công sử dụng Excel:

- Đội ngũ vận hành dành 15-20 giờ/tuần cho việc biên soạn dữ liệu thủ công
- Ra quyết định phản ứng thay vì chủ động do báo cáo chậm trễ
- Không có khả năng hiển thị tập trung vào các chỉ số KPI chính
- Dữ liệu tồn tại trong silos, phân tích chức năng chéo khó khăn

### Business Problems (Vấn đề kinh doanh)

| Problem | Impact | Business Consequence |
|---------|--------|---------------------|
| Manual Reporting | 15-20 hours/week | $120K annual labor cost |
| Delayed Insights | 24-48 hour lag | Reactive decision making |
| Data Silos | Multiple Excel files | Incomplete analysis |
| No Real-time Visibility | Cannot monitor live | Missed optimization opportunities |

### Business Opportunities (Cơ hội kinh doanh)

**Operational Excellence**
- Khả năng hiển thị real-time cho phép nhận diện và giải quyết vấn đề chủ động
- Phân tích xu hướng hỗ trợ bảo trì dự đoán và lập kế hoạch nguồn lực
- Chỉ số chuẩn hóa cho phép đo lường hiệu suất nhất quán

**Cost Optimization**
- Giảm nỗ lực thủ công tương đương $120,000 tiết kiệm chi phí lao động hàng năm
- Cải thiện sử dụng phi hành đoàn giảm chi phí tăng ca và định vị
- Phân bổ tàu bay tốt hơn giảm thiểu chuyến bay trống và ferry

---

## 3. Business Objectives

| ID | Objective | Target |
|----|-----------|--------|
| BO-001 | Giảm tỷ lệ thay đổi tàu bay | 15% reduction in 6 months |
| BO-002 | Cải thiện sử dụng phi hành đoàn | 10% efficiency gain |
| BO-003 | Loại bỏ báo cáo thủ công | 80% time reduction |
| BO-004 | Cho phép giám sát real-time | Live dashboard access |
| BO-005 | Cải thiện tốc độ ra quyết định | 50% faster decisions |

### Success Criteria
- Tất cả mục tiêu kinh doanh đạt được trong vòng 6 tháng sau go-live
- Tỷ lệ ngườ dùng chấp nhận vượt quá 80% trong quý đầu tiên
- Uptime hệ thống duy trì ở 99.5% hoặc cao hơn
- Điểm hài lòng ngườ dùng 4.0 hoặc cao hơn (trên 5.0)
- ROI tích cực đạt được trong vòng 18 tháng

---

## 4. Stakeholder Analysis

| Stakeholder | Role | Responsibility |
|-------------|------|----------------|
| **VP Operations** | Executive Sponsor | Strategic direction, funding approval |
| **IT Director** | Technical Lead | Architecture, security, infrastructure |
| **Operations Manager** | Business Owner | Requirements, user acceptance |
| **Project Manager** | Delivery Lead | Timeline, budget, coordination |
| **End Users** | User Representatives | Feedback, training, adoption |

---

## 5. Business Requirements

### Data Integration Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| BR-001 | Tích hợp với AIMS export files (CSV/XLSX) | High |
| BR-002 | Hỗ trợ làm mới dữ liệu tự động hàng ngày | High |
| BR-003 | Duy trì chất lượng dữ liệu và quy tắc validation | High |
| BR-004 | Cung cấp audit trail cho tất cả thay đổi dữ liệu | Medium |
| BR-005 | Hỗ trợ lưu trữ dữ liệu lịch sử (2 năm) | Medium |

### Reporting Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| BR-006 | Dashboard KPI real-time với các chỉ số chính | High |
| BR-007 | Biểu đồ tương tác và phân tích xu hướng | High |
| BR-008 | Xuất báo cáo ra Excel/PDF | Medium |
| BR-009 | Gửi báo cáo tự động theo lịch | Low |
| BR-010 | Lọc theo khoảng thởi gian tùy chỉnh (1-32 ngày) | High |

### Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| BR-011 | Xác thực ngườ dùng và phân quyền theo vai trò | High |
| BR-012 | Dashboard responsive cho desktop và tablet | Medium |
| BR-013 | Dark theme tối ưu cho operations center | Medium |
| BR-014 | Thông báo cảnh báo khi vượt ngưỡng | Medium |
| BR-015 | Hỗ trợ đa ngôn ngữ (Vietnamese, English) | Low |

---

## 6. Cost-Benefit Analysis

### Investment Costs

| Cost Category | Amount (USD) | Notes |
|---------------|--------------|-------|
| Software Development | $120,000 | Design, development, testing |
| Infrastructure & Hosting | $25,000 | Cloud services, databases |
| Training & Change Management | $20,000 | User training, documentation |
| Project Management | $15,000 | Coordination, reporting |
| **Total Investment** | **$180,000** | One-time cost |

### Annual Operational Benefits

| Benefit Category | Annual Value | Calculation Basis |
|------------------|--------------|-------------------|
| Labor Cost Savings | $120,000 | 80% reduction in manual reporting |
| Crew Efficiency | $85,000 | 10% improvement in utilization |
| Aircraft Optimization | $60,000 | 15% reduction in AC changes |
| Delay Reduction | $20,000 | Proactive issue identification |
| **Total Annual Benefits** | **$285,000** | Recurring benefits |

### ROI Analysis

| Metric | Value | Notes |
|--------|-------|-------|
| Total Investment | $180,000 | One-time |
| Annual Benefits | $285,000 | Recurring |
| Net Annual Benefit | $285,000 | Year 1 onwards |
| Payback Period | **8 months** | Simple payback |
| 3-Year NPV (10%) | $528,000 | Discounted cash flow |
| **3-Year ROI** | **375%** | Return on investment |

---

## 7. Risk Assessment

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| Technical Integration Issues | Medium | High | Phased rollout, thorough testing |
| User Adoption Resistance | Medium | Medium | Change management, training |
| Data Quality Issues | Low | High | Validation rules, data cleansing |
| Scope Creep | Medium | Medium | Clear requirements, change control |
| Budget Overrun | Low | Medium | Contingency reserve, monitoring |

### Risk Mitigation Strategies

**Technical Risks**
- Triển khai từng giai đoạn với nhóm ngườ dùng thử nghiệm
- Thực hiện kiểm thử tích hợp kỹ lưỡng trước khi triển khai
- Thiết lập đội ngũ hỗ trợ chuyên dụng trong giai đoạn đầu

**Organizational Risks**
- Phát triển kế hoạch quản lý thay đổi toàn diện
- Cung cấp các chương trình đào tạo mở rộng
- Xác định và thu hút các nhà vận động thay đổi

---

## 8. Success Metrics

### Business Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Aircraft Change Rate | -15% | Monthly comparison |
| Crew Utilization | +10% | Efficiency score |
| Manual Reporting Time | -80% | Hours per week |
| Decision Speed | +50% | Time to decision |

### Technical Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| System Uptime | >99.5% | Monthly availability |
| Dashboard Load Time | <3 seconds | Time to interactive |
| API Response Time | <500ms | 95th percentile |
| Data Accuracy | >99% | Validation checks |

### User Adoption Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Daily Active Users | >30 | Unique daily logins |
| Feature Adoption | >80% | Users using all widgets |
| User Satisfaction | >4.0/5 | Quarterly survey |
| Training Completion | >95% | Users trained |

---

## 9. Approval

| Name | Title | Date | Signature |
|------|-------|------|-----------|
| [Name] | VP Operations | [Date] | ____________ |
| [Name] | IT Director | [Date] | ____________ |
| [Name] | Operations Manager | [Date] | ____________ |
| [Name] | Project Manager | [Date] | ____________ |

---

## Document Information

| Field | Value |
|-------|-------|
| Document Type | Business Requirements Document (BRD) |
| Version | 1.0 |
| Date | January 2026 |
| Status | Draft for Approval |
| Author | Aviation Operations Team |

---

*This document is confidential and intended for internal use only.*
