"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Users,
  Sparkles,
  BadgeCheck,
  Trophy,
  XCircle,
} from "lucide-react";

type LeadStage = "New" | "Contacted" | "Qualified" | "Proposal" | "Won" | "Lost";

interface Lead {
  id: string;
  customerName: string;
  company: string;
  dealValue: number;
  stage: LeadStage;
  assignedTo: string;
  lastUpdated: string;
  initials: string;
}

const dummyLeads: Lead[] = [
  {
    id: "LD-3081",
    customerName: "Ayesha Khan",
    company: "Brightline Retail",
    dealValue: 12500,
    stage: "Qualified",
    assignedTo: "Hassan Raza",
    lastUpdated: "Jul 02, 2026",
    initials: "AK",
  },
  {
    id: "LD-3082",
    customerName: "Daniel Osei",
    company: "NovaCorp Solutions",
    dealValue: 8200,
    stage: "New",
    assignedTo: "Fatima Noor",
    lastUpdated: "Jul 01, 2026",
    initials: "DO",
  },
  {
    id: "LD-3083",
    customerName: "Maria Fernandez",
    company: "Luxe Homes Realty",
    dealValue: 21000,
    stage: "Proposal",
    assignedTo: "Hassan Raza",
    lastUpdated: "Jun 30, 2026",
    initials: "MF",
  },
  {
    id: "LD-3084",
    customerName: "Bilal Ahmed",
    company: "FitZone Gyms",
    dealValue: 4300,
    stage: "Lost",
    assignedTo: "Zainab Ali",
    lastUpdated: "Jun 26, 2026",
    initials: "BA",
  },
  {
    id: "LD-3085",
    customerName: "Sara Lindqvist",
    company: "Nordic Bites Cafe",
    dealValue: 9800,
    stage: "Contacted",
    assignedTo: "Fatima Noor",
    lastUpdated: "Jun 29, 2026",
    initials: "SL",
  },
  {
    id: "LD-3086",
    customerName: "James Whitfield",
    company: "BuildRight Construction",
    dealValue: 34500,
    stage: "Won",
    assignedTo: "Hassan Raza",
    lastUpdated: "Jul 02, 2026",
    initials: "JW",
  },
  {
    id: "LD-3087",
    customerName: "Chen Wei",
    company: "Pacific Tech Supplies",
    dealValue: 15750,
    stage: "Qualified",
    assignedTo: "Zainab Ali",
    lastUpdated: "Jun 28, 2026",
    initials: "CW",
  },
  {
    id: "LD-3088",
    customerName: "Amara Obi",
    company: "GreenLeaf Organics",
    dealValue: 6100,
    stage: "New",
    assignedTo: "Fatima Noor",
    lastUpdated: "Jun 27, 2026",
    initials: "AO",
  },
];

const stageStyles: Record<LeadStage, { badge: string; dot: string }> = {
  New: { badge: "bg-blue-50 text-blue-700 ring-blue-200", dot: "bg-blue-500" },
  Contacted: {
    badge: "bg-purple-50 text-purple-700 ring-purple-200",
    dot: "bg-purple-500",
  },
  Qualified: {
    badge: "bg-amber-50 text-amber-700 ring-amber-200",
    dot: "bg-amber-500",
  },
  Proposal: {
    badge: "bg-indigo-50 text-indigo-700 ring-indigo-200",
    dot: "bg-indigo-500",
  },
  Won: {
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
  },
  Lost: { badge: "bg-rose-50 text-rose-700 ring-rose-200", dot: "bg-rose-500" },
};

function StageBadge({ stage }: { stage: LeadStage }) {
  const style = stageStyles[stage];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${style.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {stage}
    </span>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent}`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-2xl font-semibold text-slate-900">{value}</p>
        <p className="text-sm text-slate-500">{label}</p>
      </div>
    </div>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function LeadPipelinePage() {
  const [search, setSearch] = useState("");

  const filteredLeads = dummyLeads.filter((lead) => {
    const query = search.toLowerCase();
    return (
      lead.customerName.toLowerCase().includes(query) ||
      lead.company.toLowerCase().includes(query) ||
      lead.id.toLowerCase().includes(query)
    );
  });

  const totalLeads = dummyLeads.length;
  const newCount = dummyLeads.filter((l) => l.stage === "New").length;
  const qualifiedCount = dummyLeads.filter((l) => l.stage === "Qualified").length;
  const wonCount = dummyLeads.filter((l) => l.stage === "Won").length;
  const lostCount = dummyLeads.filter((l) => l.stage === "Lost").length;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Lead Pipeline
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Track and manage all sales leads.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 active:bg-indigo-800"
          >
            <Plus className="h-4 w-4" />
            Add Lead
          </button>
        </div>

        {/* Stat cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <StatCard
            label="Total Leads"
            value={totalLeads}
            icon={Users}
            accent="bg-indigo-50 text-indigo-600"
          />
          <StatCard
            label="New Leads"
            value={newCount}
            icon={Sparkles}
            accent="bg-blue-50 text-blue-600"
          />
          <StatCard
            label="Qualified"
            value={qualifiedCount}
            icon={BadgeCheck}
            accent="bg-amber-50 text-amber-600"
          />
          <StatCard
            label="Won"
            value={wonCount}
            icon={Trophy}
            accent="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            label="Lost"
            value={lostCount}
            icon={XCircle}
            accent="bg-rose-50 text-rose-600"
          />
        </div>

        {/* Table container */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Search bar */}
          <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search leads..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <p className="text-sm text-slate-400">
              {filteredLeads.length} of {totalLeads} leads
            </p>
          </div>

          {/* Table - desktop */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3 font-medium">Lead ID</th>
                  <th className="px-5 py-3 font-medium">Customer Name</th>
                  <th className="px-5 py-3 font-medium">Company</th>
                  <th className="px-5 py-3 font-medium">Deal Value</th>
                  <th className="px-5 py-3 font-medium">Stage</th>
                  <th className="px-5 py-3 font-medium">Assigned To</th>
                  <th className="px-5 py-3 font-medium">Last Updated</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="transition hover:bg-slate-50/80">
                    <td className="px-5 py-4 text-sm font-medium text-slate-500">
                      {lead.id}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                          {lead.initials}
                        </div>
                        <p className="text-sm font-medium text-slate-900">
                          {lead.customerName}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {lead.company}
                    </td>
                    <td className="px-5 py-4 text-sm font-medium text-slate-900">
                      {formatCurrency(lead.dealValue)}
                    </td>
                    <td className="px-5 py-4">
                      <StageBadge stage={lead.stage} />
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {lead.assignedTo}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {lead.lastUpdated}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredLeads.length === 0 && (
              <div className="px-5 py-14 text-center text-sm text-slate-400">
                No leads match your search.
              </div>
            )}
          </div>

          {/* Cards - mobile */}
          <div className="divide-y divide-slate-100 md:hidden">
            {filteredLeads.map((lead) => (
              <div key={lead.id} className="flex flex-col gap-3 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                      {lead.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {lead.customerName}
                      </p>
                      <p className="text-xs text-slate-400">{lead.company}</p>
                    </div>
                  </div>
                  <StageBadge stage={lead.stage} />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{lead.id}</span>
                  <span className="text-sm font-medium text-slate-900">
                    {formatCurrency(lead.dealValue)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Assigned to {lead.assignedTo}</span>
                  <span>{lead.lastUpdated}</span>
                </div>
              </div>
            ))}

            {filteredLeads.length === 0 && (
              <div className="px-5 py-14 text-center text-sm text-slate-400">
                No leads match your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}