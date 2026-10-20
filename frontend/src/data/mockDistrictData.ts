export interface BeneficiaryCase {
  id: string;
  name: string;
  block: string;
  lastTransactionDays: number;
  failedTxnRate: number;
  distanceToBCKm: number;
  dbtOnlyUser: boolean;
  detectedBarrier: 'TECHNICAL_FAILURE' | 'ACCESS_GAP' | 'PREFERENCE_SATISFIED' | 'UNKNOWN';
  confidenceScore: number;
  evidence: string[];
  uncertaintyNotes: string;
  recommendedAction: string;
  estimatedCostINR: number;
}

export interface AuditLedgerEntry {
  logId: string;
  timestamp: string;
  beneficiaryId: string;
  beneficiaryName: string;
  approvingOfficer: string;
  assignedAgent: string;
  barrierCategory: string;
  actionTaken: string;
  outcomeStatus: 'REACTIVATED' | 'IN_PROGRESS' | 'CHOICE_PRESERVED' | 'FAILED';
  verificationNotes: string;
}

export const SUNDARPUR_SUMMARY = {
  districtName: "Sundarpur",
  totalAccounts: 5000,
  casesRequiringReview: 600,
  availableAgents: 10,
  allocatedBudgetINR: 50000,
  frictionBreakdown: {
    technicalFailures: 210,
    accessGaps: 270,
    preferenceSatisfied: 120
  }
};

export const OPTIMIZER_COMPARISON = {
  baselineStrategy: {
    name: "Standard Inactivity Strategy (Baseline)",
    totalSpentINR: 50000,
    casesCovered: 180,
    misallocatedCases: 65,
    estimatedReactivations: 85,
    costPerReactivationINR: 588
  },
  paisaPathStrategy: {
    name: "PaisaPath Barrier-Aware Strategy",
    totalSpentINR: 48200,
    casesCovered: 420,
    misallocatedCases: 0,
    estimatedReactivations: 310,
    costPerReactivationINR: 155
  }
};

export const MOCK_AUDIT_LOGS: AuditLedgerEntry[] = [
  {
    logId: "LOG-2026-8801",
    timestamp: "2026-10-19 14:32 IST",
    beneficiaryId: "BEN-1001",
    beneficiaryName: "Sunita Devi",
    approvingOfficer: "R. Sharma (Block Officer)",
    assignedAgent: "K. Patel (BC Agent #04)",
    barrierCategory: "TECHNICAL_FAILURE",
    actionTaken: "Micro-ATM Firmware Flash & Biometric Re-auth",
    outcomeStatus: "REACTIVATED",
    verificationNotes: "3 successful AePS cash withdrawals recorded post-intervention."
  },
  {
    logId: "LOG-2026-8802",
    timestamp: "2026-10-18 11:15 IST",
    beneficiaryId: "BEN-1002",
    beneficiaryName: "Ramesh Kumar",
    approvingOfficer: "A. Verma (District Official)",
    assignedAgent: "S. Singh (Mobile BC Van #01)",
    barrierCategory: "ACCESS_GAP",
    actionTaken: "Mobile BC Camp Deployed at Sundarpur East Village Center",
    outcomeStatus: "IN_PROGRESS",
    verificationNotes: "Field visit completed; 12 villagers assisted. Follow-up usage pending 30-day window."
  },
  {
    logId: "LOG-2026-8803",
    timestamp: "2026-10-17 09:45 IST",
    beneficiaryId: "BEN-1003",
    beneficiaryName: "Anita Soraren",
    approvingOfficer: "System Auto-Governance",
    assignedAgent: "N/A (Choice Preserved)",
    barrierCategory: "PREFERENCE_SATISFIED",
    actionTaken: "Flagged as Voluntary Cash Preference — No Field Contact",
    outcomeStatus: "CHOICE_PRESERVED",
    verificationNotes: "Beneficiary preference respected; account remains active for DBT credit."
  }
];

export const MOCK_BENEFICIARIES: BeneficiaryCase[] = [
  {
    id: "BEN-1001",
    name: "Sunita Devi",
    block: "Sundarpur North",
    lastTransactionDays: 45,
    failedTxnRate: 0.62,
    distanceToBCKm: 1.2,
    dbtOnlyUser: false,
    detectedBarrier: "TECHNICAL_FAILURE",
    confidenceScore: 0.88,
    evidence: [
      "62% transaction failure rate in last 90 days (AePS biometric mismatch)",
      "3 consecutive failed micro-ATM attempts"
    ],
    uncertaintyNotes: "Device firmware issue suspected at local BC point; customer biometric clarity unverified.",
    recommendedAction: "Technical Audit of Local BC Point + Biometric Re-authentication",
    estimatedCostINR: 150
  },
  {
    id: "BEN-1002",
    name: "Ramesh Kumar",
    block: "Sundarpur East",
    lastTransactionDays: 110,
    failedTxnRate: 0.05,
    distanceToBCKm: 14.5,
    dbtOnlyUser: false,
    detectedBarrier: "ACCESS_GAP",
    confidenceScore: 0.92,
    evidence: [
      "Nearest functional Business Correspondent is 14.5 km away",
      "Zero banking touchpoints within 30-min transit radius"
    ],
    uncertaintyNotes: "Transport infrastructure quality unknown during monsoon season.",
    recommendedAction: "Schedule Mobile BC Van / Financial Literacy Camp",
    estimatedCostINR: 450
  },
  {
    id: "BEN-1003",
    name: "Anita Soraren",
    block: "Sundarpur South",
    lastTransactionDays: 60,
    failedTxnRate: 0.00,
    distanceToBCKm: 2.1,
    dbtOnlyUser: true,
    detectedBarrier: "PREFERENCE_SATISFIED",
    confidenceScore: 0.95,
    evidence: [
      "100% successful cash withdrawal upon DBT deposit receipt",
      "Zero recorded dispute logs or failed authentication attempts"
    ],
    uncertaintyNotes: "High confidence that low activity reflects voluntary personal preference.",
    recommendedAction: "No Intervention Required (Preserve Beneficiary Choice)",
    estimatedCostINR: 0
  }
];