"use client";

import {
  DollarSign,
  Users,
  Target,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from "lucide-react";

type ActivityStatus = "Completed" | "Pending" | "In Progress";

interface ActivityRecord {
  id: string;
  customer: string;
  activity: string;
  date: string;
  status: ActivityStatus;
  initials: string;
}

interface MonthlySales {
  month: string;
  deals: number;
}

interface MonthlyRevenue {
  month: string;
  value: number;
}

interface ConversionStage {
  stage: string;
  count: number;
  color: string;
}

const salesData: MonthlySales[] = [
  { month: "Feb", deals: 18 },
  { month: "Mar", deals: 24 },
  { month: "Apr", deals: 21 },
  { month: "May", deals: 30 },
  { month: "Jun", deals: 27 },
  { month: "Jul", deals: 35 },
];

const revenueData: MonthlyRevenue[] = [
  { month: "Feb", value: 42000 },
  { month: "Mar", value: 51000 },
  { month: "Apr", value: 47500 },
  { month: "May", value: 63000 },
  { month: "Jun", value: 58500 },
  { month: "Jul", value: 74000 },
];

const conversionStages: ConversionStage[] = [
  { stage: "New", count: 120, color: "bg-blue-500" },
  { stage: "Contacted", count: 92, color: "bg-purple-500" },
  { stage: "Qualified", count: 61, color: "bg-amber-500" },
  { stage: "Proposal", count: 38, color: "bg-indigo-500" },
  { stage: "Won", count: 24, color: "bg-emerald-500" },
];

const activityRecords: ActivityRecord[] = [
  {
    id: "ACT-501",
    customer: "Ayesha Khan",
    activity: "Follow-up call scheduled",
    date: "Jul 02, 2026",
    status: "Completed",
    initials: "AK",
  },
  {
    id: "ACT-502",
    customer: "Daniel Osei",
    activity: "Proposal sent",
    date: "Jul 02, 2026",
    status: "In Progress",
    initials: "DO",
  },
  {
    id: "ACT-503",
    customer: "Maria Fernandez",
    activity: "Contract negotiation",
    date: "Jul 01, 2026",
    status: "Pending",
    initials: "MF",
  },
  {
    id: "ACT-504",
    customer: "James Whitfield",
    activity: "Deal closed - won",
    date: "Jul 01, 2026",
    status: "Completed",
    initials: "JW",
  },
  {
    id: "ACT-505",
    customer: "Sara Lindqvist",
    activity: "Demo call completed",
    date: "Jun 30, 2026",
    status: "Completed",
    initials: "SL",
  },
  {
    id: "ACT-506",
    customer: "Chen Wei",
    activity: "Pricing discussion",
    date: "Jun 29, 2026",
    status: "In Progress",
    initials: "CW",
  },
  {
    id: "ACT-507",
    customer: "Amara Obi",
    activity: "Initial outreach email",
    date: "Jun 28, 2026",
    status: "Pending",
    initials: "AO",
  },
  {
    id: "ACT-508",
    customer: "Bilal Ahmed",
    activity: "Renewal reminder sent",
    date: "Jun 27, 2026",
    status: "Completed",
    initials: "BA",
  },
];

const statusStyles: Record<ActivityStatus, { badge: string; dot: string }> = {
  Completed: {
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
  },
  Pending: {
    badge: "bg-amber-50 text-amber-700 ring-amber-200",
    dot: "bg-amber-500",
  },
  "In Progress": {
    badge: "bg-blue-50 text-blue-700 ring-blue-200",
    dot: "bg-blue-500",
  },
};

function StatusBadge({ status }: { status: ActivityStatus }) {
  const style = statusStyles[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${style.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
  trend,
  trendUp,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  accent: string;
  trend: string;
  trendUp: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={`inline-flex items-center gap-1 text-xs font-medium ${
            trendUp ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {trendUp ? (
            <TrendingUp className="h-3.5 w-3.5" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5" />
          )}
          {trend}
        </span>
      </div>
      <p className="mt-4 text-2xl font-semibold text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}

function SalesPerformanceChart({ data }: { data: MonthlySales[] }) {
  const max = Math.max(...data.map((d) => d.deals));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Sales Performance
          </h2>
          <p className="text-xs text-slate-400">Deals closed per month</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
          <ArrowUpRight className="h-3.5 w-3.5" />
          +16.2%
        </span>
      </div>

      <div className="flex h-48 items-end justify-between gap-2 sm:gap-4">
        {data.map((item) => (
          <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-40 w-full items-end">
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-indigo-600 to-indigo-400 transition-all"
                style={{ height: `${(item.deals / max) * 100}%` }}
              />
            </div>
            <span className="text-xs font-medium text-slate-400">
              {item.month}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RevenueOverviewChart({ data }: { data: MonthlyRevenue[] }) {
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const width = 300;
  const height = 140;
  const padding = 10;

  const points = data.map((item, index) => {
    const x =
      padding + (index / (data.length - 1)) * (width - padding * 2);
    const y =
      height -
      padding -
      ((item.value - min) / (max - min || 1)) * (height - padding * 2);
    return { x, y };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${
    height - padding
  } L ${points[0].x} ${height - padding} Z`;

  const latest = data[data.length - 1].value;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Revenue Overview
          </h2>
          <p className="text-xs text-slate-400">Monthly recurring revenue</p>
        </div>
        <p className="text-lg font-semibold text-slate-900">
          ${latest.toLocaleString()}
        </p>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-40 w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#revenueFill)" />
        <path
          d={linePath}
          fill="none"
          stroke="#4f46e5"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="#4f46e5" />
        ))}
      </svg>

      <div className="mt-1 flex justify-between text-xs font-medium text-slate-400">
        {data.map((item) => (
          <span key={item.month}>{item.month}</span>
        ))}
      </div>
    </div>
  );
}

function LeadConversionSection({ data }: { data: ConversionStage[] }) {
  const top = data[0].count;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-slate-900">
          Lead Conversion
        </h2>
        <p className="text-xs text-slate-400">
          Funnel from new lead to won deal
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {data.map((item) => {
          const percent = Math.round((item.count / top) * 100);
          return (
            <div key={item.stage}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">{item.stage}</span>
                <span className="text-slate-400">
                  {item.count}{" "}
                  <span className="text-xs">({percent}%)</span>
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${item.color} transition-all`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Analytics
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Monitor CRM performance and business insights.
          </p>
        </div>

        {/* Stat cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Revenue"
            value="$74,000"
            icon={DollarSign}
            accent="bg-indigo-50 text-indigo-600"
            trend="+12.4%"
            trendUp
          />
          <StatCard
            label="Total Customers"
            value="248"
            icon={Users}
            accent="bg-blue-50 text-blue-600"
            trend="+5.1%"
            trendUp
          />
          <StatCard
            label="Total Leads"
            value="335"
            icon={Target}
            accent="bg-amber-50 text-amber-600"
            trend="+8.7%"
            trendUp
          />
          <StatCard
            label="Conversion Rate"
            value="20.0%"
            icon={TrendingUp}
            accent="bg-emerald-50 text-emerald-600"
            trend="-1.3%"
            trendUp={false}
          />
        </div>

        {/* Sales performance + Revenue overview */}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SalesPerformanceChart data={salesData} />
          <RevenueOverviewChart data={revenueData} />
        </div>

        {/* Lead conversion */}
        <div className="mb-8">
          <LeadConversionSection data={conversionStages} />
        </div>

        {/* Recent activity */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-slate-900">
              Recent Activity
            </h2>
            <p className="text-xs text-slate-400">
              Latest actions across customers and leads
            </p>
          </div>

          {/* Table - desktop */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Activity</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activityRecords.map((record) => (
                  <tr key={record.id} className="transition hover:bg-slate-50/80">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                          {record.initials}
                        </div>
                        <p className="text-sm font-medium text-slate-900">
                          {record.customer}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {record.activity}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {record.date}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={record.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards - mobile */}
          <div className="divide-y divide-slate-100 md:hidden">
            {activityRecords.map((record) => (
              <div key={record.id} className="flex flex-col gap-3 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                      {record.initials}
                    </div>
                    <p className="text-sm font-medium text-slate-900">
                      {record.customer}
                    </p>
                  </div>
                  <StatusBadge status={record.status} />
                </div>
                <p className="text-sm text-slate-600">{record.activity}</p>
                <p className="text-xs text-slate-400">{record.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
);
}