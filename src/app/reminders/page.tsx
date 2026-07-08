"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Bell,
  CalendarClock,
  Clock,
  CheckCircle2,
  Inbox,
} from "lucide-react";

type ReminderPriority = "High" | "Medium" | "Low";
type ReminderStatus = "Pending" | "Completed";

interface Reminder {
  id: string;
  customerName: string;
  title: string;
  dueDate: string;
  priority: ReminderPriority;
  status: ReminderStatus;
  assignedTo: string;
  initials: string;
}

const dummyReminders: Reminder[] = [
  {
    id: "RM-2101",
    customerName: "Ayesha Khan",
    title: "Follow up on proposal feedback",
    dueDate: "Jul 03, 2026",
    priority: "High",
    status: "Pending",
    assignedTo: "Hassan Raza",
    initials: "AK",
  },
  {
    id: "RM-2102",
    customerName: "Daniel Osei",
    title: "Send updated pricing sheet",
    dueDate: "Jul 03, 2026",
    priority: "Medium",
    status: "Pending",
    assignedTo: "Fatima Noor",
    initials: "DO",
  },
  {
    id: "RM-2103",
    customerName: "Maria Fernandez",
    title: "Schedule contract signing call",
    dueDate: "Jul 04, 2026",
    priority: "High",
    status: "Pending",
    assignedTo: "Hassan Raza",
    initials: "MF",
  },
  {
    id: "RM-2104",
    customerName: "James Whitfield",
    title: "Send welcome onboarding email",
    dueDate: "Jul 02, 2026",
    priority: "Low",
    status: "Completed",
    assignedTo: "Zainab Ali",
    initials: "JW",
  },
  {
    id: "RM-2105",
    customerName: "Sara Lindqvist",
    title: "Check in after product demo",
    dueDate: "Jul 05, 2026",
    priority: "Medium",
    status: "Pending",
    assignedTo: "Fatima Noor",
    initials: "SL",
  },
  {
    id: "RM-2106",
    customerName: "Chen Wei",
    title: "Renewal discussion call",
    dueDate: "Jul 06, 2026",
    priority: "Medium",
    status: "Pending",
    assignedTo: "Zainab Ali",
    initials: "CW",
  },
  {
    id: "RM-2107",
    customerName: "Bilal Ahmed",
    title: "Re-engagement outreach",
    dueDate: "Jun 30, 2026",
    priority: "Low",
    status: "Completed",
    assignedTo: "Hassan Raza",
    initials: "BA",
  },
  {
    id: "RM-2108",
    customerName: "Amara Obi",
    title: "Send trial expiry reminder",
    dueDate: "Jul 07, 2026",
    priority: "High",
    status: "Pending",
    assignedTo: "Fatima Noor",
    initials: "AO",
  },
];

const priorityStyles: Record<ReminderPriority, { badge: string; dot: string }> = {
  High: { badge: "bg-rose-50 text-rose-700 ring-rose-200", dot: "bg-rose-500" },
  Medium: {
    badge: "bg-amber-50 text-amber-700 ring-amber-200",
    dot: "bg-amber-500",
  },
  Low: { badge: "bg-slate-100 text-slate-600 ring-slate-200", dot: "bg-slate-400" },
};

const statusStyles: Record<ReminderStatus, { badge: string; dot: string }> = {
  Pending: {
    badge: "bg-blue-50 text-blue-700 ring-blue-200",
    dot: "bg-blue-500",
  },
  Completed: {
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
  },
};

function PriorityBadge({ priority }: { priority: ReminderPriority }) {
  const style = priorityStyles[priority];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${style.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {priority}
    </span>
  );
}

function StatusBadge({ status }: { status: ReminderStatus }) {
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

export default function RemindersPage() {
  const [search, setSearch] = useState("");

  const filteredReminders = dummyReminders.filter((reminder) => {
    const query = search.toLowerCase();
    return (
      reminder.customerName.toLowerCase().includes(query) ||
      reminder.title.toLowerCase().includes(query) ||
      reminder.id.toLowerCase().includes(query)
    );
  });

  const totalReminders = dummyReminders.length;
  const todayCount = dummyReminders.filter(
    (r) => r.dueDate === "Jul 03, 2026"
  ).length;
  const upcomingCount = dummyReminders.filter(
    (r) => r.status === "Pending" && r.dueDate !== "Jul 03, 2026"
  ).length;
  const completedCount = dummyReminders.filter(
    (r) => r.status === "Completed"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Reminders
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage upcoming reminders and follow-ups.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 active:bg-indigo-800"
          >
            <Plus className="h-4 w-4" />
            Add Reminder
          </button>
        </div>

        {/* Summary cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Reminders"
            value={totalReminders}
            icon={Bell}
            accent="bg-indigo-50 text-indigo-600"
          />
          <StatCard
            label="Today's Reminders"
            value={todayCount}
            icon={CalendarClock}
            accent="bg-blue-50 text-blue-600"
          />
          <StatCard
            label="Upcoming"
            value={upcomingCount}
            icon={Clock}
            accent="bg-amber-50 text-amber-600"
          />
          <StatCard
            label="Completed"
            value={completedCount}
            icon={CheckCircle2}
            accent="bg-emerald-50 text-emerald-600"
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
                placeholder="Search reminders..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <p className="text-sm text-slate-400">
              {filteredReminders.length} of {totalReminders} reminders
            </p>
          </div>

          {/* Table - desktop */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3 font-medium">Reminder ID</th>
                  <th className="px-5 py-3 font-medium">Customer Name</th>
                  <th className="px-5 py-3 font-medium">Reminder Title</th>
                  <th className="px-5 py-3 font-medium">Due Date</th>
                  <th className="px-5 py-3 font-medium">Priority</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Assigned To</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredReminders.map((reminder) => (
                  <tr key={reminder.id} className="transition hover:bg-slate-50/80">
                    <td className="px-5 py-4 text-sm font-medium text-slate-500">
                      {reminder.id}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                          {reminder.initials}
                        </div>
                        <p className="text-sm font-medium text-slate-900">
                          {reminder.customerName}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {reminder.title}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {reminder.dueDate}
                    </td>
                    <td className="px-5 py-4">
                      <PriorityBadge priority={reminder.priority} />
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={reminder.status} />
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {reminder.assignedTo}
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

            {filteredReminders.length === 0 && (
              <div className="flex flex-col items-center gap-3 px-5 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Inbox className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium text-slate-600">
                  No reminders found
                </p>
                <p className="text-xs text-slate-400">
                  Try adjusting your search terms.
                </p>
              </div>
            )}
          </div>

          {/* Cards - mobile */}
          <div className="divide-y divide-slate-100 md:hidden">
            {filteredReminders.map((reminder) => (
              <div key={reminder.id} className="flex flex-col gap-3 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                      {reminder.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {reminder.customerName}
                      </p>
                      <p className="text-xs text-slate-400">{reminder.id}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-sm text-slate-700">{reminder.title}</p>

                <div className="flex items-center gap-2">
                  <PriorityBadge priority={reminder.priority} />
                  <StatusBadge status={reminder.status} />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Assigned to {reminder.assignedTo}</span>
                  <span>{reminder.dueDate}</span>
                </div>
              </div>
            ))}

            {filteredReminders.length === 0 && (
              <div className="flex flex-col items-center gap-3 px-5 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Inbox className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium text-slate-600">
                  No reminders found
                </p>
                <p className="text-xs text-slate-400">
                  Try adjusting your search terms.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}