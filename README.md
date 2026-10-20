# 🧭 PaisaPath

> **Navigating Dormant Accounts to Active Financial Participation.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stack: React + Vite](https://img.shields.io/badge/Frontend-React%20%7C%20Vite%20%7C%20Tailwind-61DAFB)](https://reactjs.org/)
[![Backend: FastAPI](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python-009688)](https://fastapi.tiangolo.com/)
[![AI: XGBoost + SHAP](https://img.shields.io/badge/AI-XGBoost%20%7C%20SHAP-FF6F00)](https://xgboost.readthedocs.io/)
[![Database: PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791)](https://www.postgresql.org/)

---

## 📌 Executive Summary

**PaisaPath** is an AI-powered Financial Inclusion Intelligence & Intervention Platform designed to address the critical challenge of dormant and underutilized **Pradhan Mantri Jan Dhan Yojana (PMJDY)** bank accounts.

While India’s Digital Public Infrastructure (DPI) has successfully opened millions of zero-balance accounts, transforming passive account holders into active economic participants remains a major hurdle. **PaisaPath** bridge this gap by predicting account dormancy risks, explaining the root causes behind inactive behavior using Explainable AI (SHAP), and powering targeted last-mile interventions (BC visits, IVR alerts, SMS campaigns, and literacy camps) with verifiable feedback loops.

---

## ⚡ Key Features & Innovations

- **🔮 Predictive Dormancy Scoring Engine:** Machine learning model (XGBoost/Random Forest) evaluating 5,000+ synthetic PMJDY telemetry points to output a real-time Risk Score (0–100).
- **💡 Explainable AI (SHAP Integration):** Provides district administrators with human-readable rationale (e.g., *"No transaction for 120 days"*, *"Zero UPI usage"*, *"Single DBT dependency"*) instead of black-box risk values.
- **🗺️ Interactive District & Block Heatmaps:** Geographic visualization using Leaflet.js to pinpoint high-risk dormancy clusters across blocks.
- **🎯 Intelligent Intervention Workflow:** Assigns optimized, role-based action triggers (Business Correspondent physical visits, localized IVR calls, or SMS nudges).
- **📈 Intervention ROI & Outcome Tracker:** Real-time feedback dashboard measuring post-intervention account reactivation and transaction velocity.
- **🔒 Policy-Grade Data Governance:** Full Role-Based Access Control (RBAC) across 4 administrative tiers alongside immutable audit and consent logging.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend UI** | React.js (Vite), Tailwind CSS, shadcn/ui, Recharts, Lucide Icons |
| **Mapping & GIS** | Leaflet.js, OpenStreetMap |
| **Backend API** | FastAPI (Python), Pydantic validation, Uvicorn |
| **AI / ML Pipeline** | Scikit-learn, XGBoost, SHAP (Explainable AI), Pandas, NumPy |
| **Database & Cache** | PostgreSQL (Neon DB), Redis (Optional Caching) |
| **Deployment** | Vercel (Frontend), Railway / Render (Backend), GitHub Actions |

---

## 🏗️ System Architecture
┌────────────────────────────────┐
                           │     PMJDY & Telemetry Data     │
                           │  (DBT, UPI, AePS, Mobile Link)  │
                           └───────────────┬────────────────┘
                                           │
                                           ▼
                           ┌────────────────────────────────┐
                           │   FastAPI Core REST Backend    │
                           └───────────────┬────────────────┘
                                           │
                                           ▼
                           ┌────────────────────────────────┐
                           │  XGBoost Risk Engine + SHAP    │
                           │ (Dormancy Score & Explanation) │
                           └───────────────┬────────────────┘
                                           │
                                           ▼
                           ┌────────────────────────────────┐
                           │    PostgreSQL Database Storage │
                           └───────────────┬────────────────┘
                                           │
                                           ▼
                           ┌────────────────────────────────┐
                           │     PaisaPath React Dashboard  │
                           │  (District Officers / BCs)     │
                           └────────────────────────────────┘
                           ---

## 👥 User Roles & Access Hierarchy

1. **District Official:** Full district command overview, high-level analytics, block risk comparison, and policy reporting.
2. **Block Officer:** Block-level filter views, beneficiary risk prioritization, and intervention scheduling.
3. **Business Correspondent (BC Agent):** Field-level mobile task list, beneficiary contact details, and field visit verification.
4. **Read-Only Policy Viewer:** Audit access for government compliance evaluators and research observers.

---

## 🚦 Getting Started

### Prerequisites
- **Node.js:** v18.0+
- **Python:** v3.10+
- **PostgreSQL:** v14+

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
