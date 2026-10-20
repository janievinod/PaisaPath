import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell 
} from 'recharts';
import { 
  Compass, Users, AlertTriangle, Activity, CheckCircle, 
  Filter, Layers, ShieldCheck, ArrowUpRight, Wrench, MapPin, Smile, 
  Sparkles, SlidersHorizontal, Calculator, History, FileCheck, CheckCircle2, Clock
} from 'lucide-react';
import { 
  SUNDARPUR_SUMMARY, OPTIMIZER_COMPARISON, MOCK_BENEFICIARIES, MOCK_AUDIT_LOGS 
} from '../data/mockDistrictData';

const barrierChartData = [
  { name: 'Technical Failures (Person B)', count: SUNDARPUR_SUMMARY.frictionBreakdown.technicalFailures, color: '#f43f5e' },
  { name: 'Access Gaps (Person C)', count: SUNDARPUR_SUMMARY.frictionBreakdown.accessGaps, color: '#f59e0b' },
  { name: 'Satisfied / Cash Pref (Person A)', count: SUNDARPUR_SUMMARY.frictionBreakdown.preferenceSatisfied, color: '#10b981' },
];

export default function Dashboard() {
  const [selectedRole, setSelectedRole] = useState<'District Official' | 'Block Officer' | 'BC Agent'>('District Official');
  const [filterBarrier, setFilterBarrier] = useState<string>('ALL');
  const [activeStrategy, setActiveStrategy] = useState<'BASELINE' | 'PAISAPATH'>('PAISAPATH');

  const filteredCases = filterBarrier === 'ALL' 
    ? MOCK_BENEFICIARIES 
    : MOCK_BENEFICIARIES.filter(item => item.detectedBarrier === filterBarrier);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-16">
      
      {/* GLOBAL HEADER & ROLE SELECTOR */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between shadow-lg gap-4">
        <div className="flex items-center gap-3.5">
          <div className="relative bg-gradient-to-tr from-indigo-600 to-violet-500 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-500/30">
            <Compass className="w-5 h-5 animate-spin-slow" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-black tracking-tight text-white">
                Paisa<span className="text-indigo-400">Path</span>
              </h1>
              <span className="bg-indigo-500/10 text-indigo-300 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-indigo-500/20 tracking-wider">
                Govt Intelligence Suite
              </span>
            </div>
            <p className="text-xs text-slate-400">Financial Access Friction & Intervention Intelligence Platform</p>
          </div>
        </div>

        {/* Role Switcher & Security Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-800/90 px-3.5 py-2 rounded-xl border border-slate-700/80 shadow-inner">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span className="text-xs text-slate-400 font-medium">Role:</span>
            <select 
              value={selectedRole} 
              onChange={(e) => setSelectedRole(e.target.value as any)}
              className="bg-transparent text-xs font-bold text-indigo-300 focus:outline-none cursor-pointer"
            >
              <option value="District Official" className="bg-slate-900">District Official</option>
              <option value="Block Officer" className="bg-slate-900">Block Officer</option>
              <option value="BC Agent" className="bg-slate-900">BC Agent (Field)</option>
            </select>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 text-xs px-3 py-2 rounded-xl border border-emerald-500/20 font-medium shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>DPDP Compliant</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
        
        {/* District Overview Hero Card */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Demo District: {SUNDARPUR_SUMMARY.districtName}
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight">Barrier-to-Action Command Center</h2>
              <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                Targeting <strong className="text-indigo-300">{SUNDARPUR_SUMMARY.casesRequiringReview} review cases</strong> out of {SUNDARPUR_SUMMARY.totalAccounts.toLocaleString()} PMJDY accounts under ₹{SUNDARPUR_SUMMARY.allocatedBudgetINR.toLocaleString('en-IN')} optimized budget.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-700 transition shadow-sm">
                <Filter className="w-4 h-4 text-indigo-400" /> Export Audit Log
              </button>
            </div>
          </div>
        </div>

        {/* Top Metric KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-slate-900/90 backdrop-blur p-6 rounded-2xl border border-slate-800 shadow-xl">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Accounts</span>
              <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black text-white mt-3">{SUNDARPUR_SUMMARY.totalAccounts.toLocaleString()}</p>
            <span className="inline-flex items-center text-[11px] font-bold text-emerald-400 mt-2 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> Synchronized with DBT Registry
            </span>
          </div>

          <div className="bg-slate-900/90 backdrop-blur p-6 rounded-2xl border border-slate-800 shadow-xl">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Cases Under Review</span>
              <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black text-amber-400 mt-3">{SUNDARPUR_SUMMARY.casesRequiringReview}</p>
            <p className="text-xs text-slate-400 mt-2">Filtered for targeted intervention</p>
          </div>

          <div className="bg-slate-900/90 backdrop-blur p-6 rounded-2xl border border-slate-800 shadow-xl">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Field Workforce</span>
              <div className="p-2 bg-violet-500/10 rounded-xl text-violet-400">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black text-violet-400 mt-3">{SUNDARPUR_SUMMARY.availableAgents} Agents</p>
            <p className="text-xs text-slate-400 mt-2">Available for deployment</p>
          </div>

          <div className="bg-slate-900/90 backdrop-blur p-6 rounded-2xl border border-slate-800 shadow-xl">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Intervention Budget</span>
              <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black text-emerald-400 mt-3">₹{SUNDARPUR_SUMMARY.allocatedBudgetINR.toLocaleString('en-IN')}</p>
            <p className="text-xs text-slate-400 mt-2">Optimized cost allocation</p>
          </div>
        </div>

        {/* MODULE 1 VISUALIZATION: Barrier Breakdown Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900/90 backdrop-blur p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-extrabold text-white">Module 1 — Financial Friction Radar</h3>
                <span className="text-xs font-bold bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20">
                  Diagnosis Breakdown
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-6">Distinguishing technical failures and access gaps from personal cash preferences.</p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barrierChartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1e293b" />
                  <XAxis type="number" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                  <YAxis dataKey="name" type="category" width={190} tick={{ fontSize: 11, fill: '#cbd5e1' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} 
                  />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                    {barrierChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Filter Panel */}
          <div className="bg-slate-900/90 backdrop-blur p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-white mb-1">Filter Barrier Categories</h3>
              <p className="text-xs text-slate-400 mb-5">Select a specific barrier hypothesis to inspect cases.</p>
              
              <div className="space-y-3">
                <button 
                  onClick={() => setFilterBarrier('ALL')}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition flex items-center justify-between ${filterBarrier === 'ALL' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'}`}
                >
                  <span>All Review Cases</span>
                  <span className="font-mono bg-white/20 px-2 py-0.5 rounded text-[11px]">600</span>
                </button>
                <button 
                  onClick={() => setFilterBarrier('TECHNICAL_FAILURE')}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition flex items-center justify-between ${filterBarrier === 'TECHNICAL_FAILURE' ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20' : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30'}`}
                >
                  <span className="flex items-center gap-2"><Wrench className="w-3.5 h-3.5" /> Technical Failures (Person B)</span>
                  <span className="font-mono bg-white/20 px-2 py-0.5 rounded text-[11px]">210</span>
                </button>
                <button 
                  onClick={() => setFilterBarrier('ACCESS_GAP')}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition flex items-center justify-between ${filterBarrier === 'ACCESS_GAP' ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}
                >
                  <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Access Gaps (Person C)</span>
                  <span className="font-mono bg-white/20 px-2 py-0.5 rounded text-[11px]">270</span>
                </button>
                <button 
                  onClick={() => setFilterBarrier('PREFERENCE_SATISFIED')}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition flex items-center justify-between ${filterBarrier === 'PREFERENCE_SATISFIED' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}`}
                >
                  <span className="flex items-center gap-2"><Smile className="w-3.5 h-3.5" /> Satisfied / Cash Pref (Person A)</span>
                  <span className="font-mono bg-white/20 px-2 py-0.5 rounded text-[11px]">120</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MODULE 2: Explainable Case Intelligence Table */}
        <div className="bg-slate-900/90 backdrop-blur rounded-2xl border border-slate-800 shadow-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
            <div>
              <h3 className="text-lg font-extrabold text-white">Module 2 — Explainable Case Intelligence</h3>
              <p className="text-xs text-slate-400 mt-0.5">Inspecting evidentiary telemetry, confidence scores, and recommended interventions.</p>
            </div>
            <span className="text-xs font-semibold text-indigo-300 bg-indigo-500/10 px-3.5 py-1.5 rounded-xl border border-indigo-500/20 self-start md:self-auto">
              Showing {filteredCases.length} records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950/60 text-slate-400 border-b border-slate-800">
                  <th className="p-3.5 font-bold uppercase tracking-wider">Beneficiary ID & Name</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider">Block / Location</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider">Detected Barrier Hypothesis</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider">Evidentiary Telemetry</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider">Recommended Action</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider text-right">Est. Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredCases.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3.5">
                      <p className="font-bold text-white">{item.name}</p>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">{item.id}</p>
                    </td>
                    <td className="p-3.5 font-medium text-slate-300">
                      {item.block}
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-lg font-bold text-[10px] inline-block tracking-wide ${
                        item.detectedBarrier === 'TECHNICAL_FAILURE' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                        item.detectedBarrier === 'ACCESS_GAP' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {item.detectedBarrier.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3.5 max-w-xs text-slate-300">
                      <ul className="list-disc list-inside space-y-1">
                        {item.evidence.map((ev, i) => (
                          <li key={i} className="truncate text-slate-300">{ev}</li>
                        ))}
                      </ul>
                      <p className="text-[10px] text-slate-400 mt-1 italic">Uncertainty: {item.uncertaintyNotes}</p>
                    </td>
                    <td className="p-3.5 font-medium text-slate-200">
                      {item.recommendedAction}
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold text-emerald-400 text-sm">
                      ₹{item.estimatedCostINR}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODULE 3: Intervention Optimizer & Strategy Comparison */}
        <div className="bg-slate-900/90 backdrop-blur rounded-2xl border border-slate-800 shadow-xl p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-1">
                <Calculator className="w-3.5 h-3.5" /> Resource Allocation Engine
              </div>
              <h3 className="text-lg font-extrabold text-white">Module 3 — Intervention Strategy Optimizer</h3>
              <p className="text-xs text-slate-400">Comparing standard inactivity flags vs. PaisaPath barrier-aware allocation under ₹50,000 budget and 10 field agents.</p>
            </div>

            {/* Strategy Toggle */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 self-start md:self-auto">
              <button 
                onClick={() => setActiveStrategy('BASELINE')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${activeStrategy === 'BASELINE' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                Standard Baseline Strategy
              </button>
              <button 
                onClick={() => setActiveStrategy('PAISAPATH')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${activeStrategy === 'PAISAPATH' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                PaisaPath Strategy (Recommended)
              </button>
            </div>
          </div>

          {/* Strategy Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-400 uppercase font-bold">Total Budget Spent</p>
              <p className="text-2xl font-black text-white mt-1">
                ₹{activeStrategy === 'PAISAPATH' ? OPTIMIZER_COMPARISON.paisaPathStrategy.totalSpentINR.toLocaleString('en-IN') : OPTIMIZER_COMPARISON.baselineStrategy.totalSpentINR.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">Allocated budget: ₹50,000</p>
            </div>

            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-400 uppercase font-bold">Cases Covered</p>
              <p className="text-2xl font-black text-indigo-400 mt-1">
                {activeStrategy === 'PAISAPATH' ? OPTIMIZER_COMPARISON.paisaPathStrategy.casesCovered : OPTIMIZER_COMPARISON.baselineStrategy.casesCovered} Beneficiaries
              </p>
              <p className="text-[11px] text-indigo-300/80 mt-1">
                {activeStrategy === 'PAISAPATH' ? '+133% higher coverage' : 'Limited by generic spend'}
              </p>
            </div>

            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-400 uppercase font-bold">Wasted / Misallocated Spend</p>
              <p className={`text-2xl font-black mt-1 ${activeStrategy === 'PAISAPATH' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {activeStrategy === 'PAISAPATH' ? '0 Cases (₹0)' : '65 Cases (₹18,200)'}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                {activeStrategy === 'PAISAPATH' ? 'Zero waste on voluntary cash users' : 'Spent on satisfied Person A users'}
              </p>
            </div>

            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-400 uppercase font-bold">Cost Per Reactivated Account</p>
              <p className="text-2xl font-black text-emerald-400 mt-1">
                ₹{activeStrategy === 'PAISAPATH' ? OPTIMIZER_COMPARISON.paisaPathStrategy.costPerReactivationINR : OPTIMIZER_COMPARISON.baselineStrategy.costPerReactivationINR}
              </p>
              <p className="text-[11px] text-emerald-300 mt-1">
                {activeStrategy === 'PAISAPATH' ? '3.8x higher ROI' : 'High cost per result'}
              </p>
            </div>
          </div>
        </div>

        {/* MODULE 4: Accountability Ledger & Verified Follow-Through */}
        <div className="bg-slate-900/90 backdrop-blur rounded-2xl border border-slate-800 shadow-xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 mb-1">
                <History className="w-3.5 h-3.5" /> Governance Audit
              </div>
              <h3 className="text-lg font-extrabold text-white">Module 4 — Accountability Ledger</h3>
              <p className="text-xs text-slate-400">Auditable, timestamped log recording intervention approvals, field executions, and measured outcomes.</p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
              <FileCheck className="w-4 h-4 text-emerald-400" /> Immutable Records
            </span>
          </div>

          <div className="space-y-4">
            {MOCK_AUDIT_LOGS.map((log) => (
              <div key={log.logId} className="bg-slate-950/80 p-5 rounded-xl border border-slate-800/80 flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-400">{log.logId}</span>
                    <span className="text-xs font-bold text-white">{log.beneficiaryName} ({log.beneficiaryId})</span>
                    <span className="text-[10px] text-slate-500 font-mono">[{log.timestamp}]</span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">{log.actionTaken}</p>
                  <p className="text-[11px] text-slate-400">
                    Approved by: <strong className="text-slate-200">{log.approvingOfficer}</strong> | Field Agent: <strong className="text-slate-200">{log.assignedAgent}</strong>
                  </p>
                  <p className="text-[11px] text-slate-400 italic mt-1 bg-slate-900/60 p-2 rounded border border-slate-800">
                    Verification Note: {log.verificationNotes}
                  </p>
                </div>

                <div className="self-start md:self-center">
                  <span className={`px-3 py-1.5 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 ${
                    log.outcomeStatus === 'REACTIVATED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    log.outcomeStatus === 'IN_PROGRESS' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    {log.outcomeStatus === 'REACTIVATED' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    {log.outcomeStatus === 'IN_PROGRESS' && <Clock className="w-4 h-4 text-amber-400" />}
                    {log.outcomeStatus.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}