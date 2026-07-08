"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  StickyNote,
  CalendarDays,
  Star,
  Archive,
  Inbox,
} from "lucide-react";

type NoteCategory = "Meeting" | "Follow-up" | "Sales" | "General";
type NoteStatus = "Active" | "Archived";

interface Note {
  id: string;
  customerName: string;
  title: string;
  category: NoteCategory;
  createdDate: string;
  status: NoteStatus;
  assignedTo: string;
  important: boolean;
  initials: string;
}

const dummyNotes: Note[] = [
  {
    id: "NT-4201",
    customerName: "Ayesha Khan",
    title: "Discussed budget constraints for Q3 rollout",
    category: "Meeting",
    createdDate: "Jul 03, 2026",
    status: "Active",
    assignedTo: "Hassan Raza",
    important: true,
    initials: "AK",
  },
  {
    id: "NT-4202",
    customerName: "Daniel Osei",
    title: "Requested case studies from similar industry",
    category: "Follow-up",
    createdDate: "Jul 03, 2026",
    status: "Active",
    assignedTo: "Fatima Noor",
    important: false,
    initials: "DO",
  },
  {
    id: "NT-4203",
    customerName: "Maria Fernandez",
    title: "Verbal agreement on contract terms",
    category: "Sales",
    createdDate: "Jul 02, 2026",
    status: "Active",
    assignedTo: "Hassan Raza",
    important: true,
    initials: "MF",
  },
  {
    id: "NT-4204",
    customerName: "James Whitfield",
    title: "Onboarding kickoff notes",
    category: "General",
    createdDate: "Jul 01, 2026",
    status: "Active",
    assignedTo: "Zainab Ali",
    important: false,
    initials: "JW",
  },
  {
    id: "NT-4205",
    customerName: "Sara Lindqvist",
    title: "Product demo feedback summary",
    category: "Meeting",
    createdDate: "Jun 30, 2026",
    status: "Archived",
    assignedTo: "Fatima Noor",
    important: false,
    initials: "SL",
  },
  {
    id: "NT-4206",
    customerName: "Chen Wei",
    title: "Renewal terms need legal review",
    category: "Sales",
    createdDate: "Jun 29, 2026",
    status: "Active",
    assignedTo: "Zainab Ali",
    important: true,
    initials: "CW",
  },
  {
    id: "NT-4207",
    customerName: "Bilal Ahmed",
    title: "Customer paused decision, revisit in Q4",
    category: "Follow-up",
    createdDate: "Jun 27, 2026",
    status: "Archived",
    assignedTo: "Hassan Raza",
    important: false,
    initials: "BA",
  },
  {
    id: "NT-4208",
    customerName: "Amara Obi",
    title: "Trial extended by two weeks",
    category: "General",
    createdDate: "Jun 26, 2026",
    status: "Active",
    assignedTo: "Fatima Noor",
    important: false,
    initials: "AO",
  },
];

const categoryStyles: Record<NoteCategory, { badge: string; dot: string }> = {
  Meeting: {
    badge: "bg-indigo-50 text-indigo-700 ring-indigo-200",
    dot: "bg-indigo-500",
  },
  "Follow-up": {
    badge: "bg-blue-50 text-blue-700 ring-blue-200",
    dot: "bg-blue-500",
  },
  Sales: {
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
  },
  General: {
    badge: "bg-slate-100 text-slate-600 ring-slate-200",
    dot: "bg-slate-400",
  },
};

const statusStyles: Record<NoteStatus, { badge: string; dot: string }> = {
  Active: {
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
  },
  Archived: {
    badge: "bg-slate-100 text-slate-600 ring-slate-200",
    dot: "bg-slate-400",
  },
};

function CategoryBadge({ category }: { category: NoteCategory }) {
  const style = categoryStyles[category];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${style.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {category}
    </span>
  );
}

function StatusBadge({ status }: { status: NoteStatus }) {
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

export default function NotesPage() {
  const [search, setSearch] = useState("");

  const filteredNotes = dummyNotes.filter((note) => {
    const query = search.toLowerCase();
    return (
      note.customerName.toLowerCase().includes(query) ||
      note.title.toLowerCase().includes(query) ||
      note.id.toLowerCase().includes(query)
    );
  });

  const totalNotes = dummyNotes.length;
  const todayCount = dummyNotes.filter(
    (n) => n.createdDate === "Jul 03, 2026"
  ).length;
  const importantCount = dummyNotes.filter((n) => n.important).length;
  const archivedCount = dummyNotes.filter((n) => n.status === "Archived").length;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Notes
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Organize customer notes and meeting records.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 active:bg-indigo-800"
          >
            <Plus className="h-4 w-4" />
            Add Note
          </button>
        </div>

        {/* Summary cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Notes"
            value={totalNotes}
            icon={StickyNote}
            accent="bg-indigo-50 text-indigo-600"
          />
          <StatCard
            label="Today's Notes"
            value={todayCount}
            icon={CalendarDays}
            accent="bg-blue-50 text-blue-600"
          />
          <StatCard
            label="Important Notes"
            value={importantCount}
            icon={Star}
            accent="bg-amber-50 text-amber-600"
          />
          <StatCard
            label="Archived Notes"
            value={archivedCount}
            icon={Archive}
            accent="bg-slate-100 text-slate-500"
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
                placeholder="Search notes..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <p className="text-sm text-slate-400">
              {filteredNotes.length} of {totalNotes} notes
            </p>
          </div>

          {/* Table - desktop */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3 font-medium">Note ID</th>
                  <th className="px-5 py-3 font-medium">Customer Name</th>
                  <th className="px-5 py-3 font-medium">Note Title</th>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Created Date</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Assigned To</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredNotes.map((note) => (
                  <tr key={note.id} className="transition hover:bg-slate-50/80">
                    <td className="px-5 py-4 text-sm font-medium text-slate-500">
                      {note.id}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                          {note.initials}
                        </div>
                        <p className="text-sm font-medium text-slate-900">
                          {note.customerName}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1.5">
                        {note.important && (
                          <Star className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400" />
                        )}
                        <span>{note.title}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <CategoryBadge category={note.category} />
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {note.createdDate}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={note.status} />
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {note.assignedTo}
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

            {filteredNotes.length === 0 && (
              <div className="flex flex-col items-center gap-3 px-5 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Inbox className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium text-slate-600">
                  No notes found
                </p>
                <p className="text-xs text-slate-400">
                  Try adjusting your search terms.
                </p>
              </div>
            )}
          </div>

          {/* Cards - mobile */}
          <div className="divide-y divide-slate-100 md:hidden">
            {filteredNotes.map((note) => (
              <div key={note.id} className="flex flex-col gap-3 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                      {note.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {note.customerName}
                      </p>
                      <p className="text-xs text-slate-400">{note.id}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-start gap-1.5">
                  {note.important && (
                    <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400" />
                  )}
                  <p className="text-sm text-slate-700">{note.title}</p>
                </div>

                <div className="flex items-center gap-2">
                  <CategoryBadge category={note.category} />
                  <StatusBadge status={note.status} />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Assigned to {note.assignedTo}</span>
                  <span>{note.createdDate}</span>
                </div>
              </div>
            ))}

            {filteredNotes.length === 0 && (
              <div className="flex flex-col items-center gap-3 px-5 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Inbox className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium text-slate-600">
                  No notes found
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