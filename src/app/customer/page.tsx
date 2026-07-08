"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Mail,
  Phone,
  MoreVertical,
  Users,
  UserCheck,
  UserPlus,
  UserX,
} from "lucide-react";

type CustomerStatus = "Active" | "Lead" | "Inactive";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: CustomerStatus;
  lastContact: string;
  initials: string;
}

const dummyCustomers: Customer[] = [
  {
    id: "CUS-1024",
    name: "Ayesha Khan",
    email: "ayesha.khan@brightmail.com",
    phone: "+92 300 1234567",
    company: "Brightline Retail",
    status: "Active",
    lastContact: "Jul 01, 2026",
    initials: "AK",
  },
  {
    id: "CUS-1025",
    name: "Daniel Osei",
    email: "d.osei@novacorp.io",
    phone: "+1 415 555 0148",
    company: "NovaCorp Solutions",
    status: "Lead",
    lastContact: "Jun 29, 2026",
    initials: "DO",
  },
  {
    id: "CUS-1026",
    name: "Maria Fernandez",
    email: "maria.f@luxehomes.com",
    phone: "+34 611 223 344",
    company: "Luxe Homes Realty",
    status: "Active",
    lastContact: "Jun 28, 2026",
    initials: "MF",
  },
  {
    id: "CUS-1027",
    name: "Bilal Ahmed",
    email: "bilal.ahmed@fitzone.pk",
    phone: "+92 321 9876543",
    company: "FitZone Gyms",
    status: "Inactive",
    lastContact: "May 14, 2026",
    initials: "BA",
  },
  {
    id: "CUS-1028",
    name: "Sara Lindqvist",
    email: "sara.l@nordicbites.se",
    phone: "+46 70 123 45 67",
    company: "Nordic Bites Cafe",
    status: "Lead",
    lastContact: "Jun 30, 2026",
    initials: "SL",
  },
  {
    id: "CUS-1029",
    name: "James Whitfield",
    email: "j.whitfield@buildright.com",
    phone: "+1 212 555 0199",
    company: "BuildRight Construction",
    status: "Active",
    lastContact: "Jul 02, 2026",
    initials: "JW",
  },
];

function StatusBadge({ status }: { status: CustomerStatus }) {
  const styles: Record<CustomerStatus, string> = {
    Active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Lead: "bg-amber-50 text-amber-700 ring-amber-200",
    Inactive: "bg-slate-100 text-slate-600 ring-slate-200",
  };

  const dot: Record<CustomerStatus, string> = {
    Active: "bg-emerald-500",
    Lead: "bg-amber-500",
    Inactive: "bg-slate-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot[status]}`} />
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

export default function CustomerPage() {
  const [search, setSearch] = useState("");

  const filteredCustomers = dummyCustomers.filter((customer) => {
    const query = search.toLowerCase();
    return (
      customer.name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      customer.company.toLowerCase().includes(query)
    );
  });

  const totalCustomers = dummyCustomers.length;
  const activeCount = dummyCustomers.filter((c) => c.status === "Active").length;
  const leadCount = dummyCustomers.filter((c) => c.status === "Lead").length;
  const inactiveCount = dummyCustomers.filter((c) => c.status === "Inactive").length;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Customers
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage and track all your customers in one place.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 active:bg-indigo-800"
          >
            <Plus className="h-4 w-4" />
            Add Customer
          </button>
        </div>

        {/* Stat cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Customers"
            value={totalCustomers}
            icon={Users}
            accent="bg-indigo-50 text-indigo-600"
          />
          <StatCard
            label="Active"
            value={activeCount}
            icon={UserCheck}
            accent="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            label="Leads"
            value={leadCount}
            icon={UserPlus}
            accent="bg-amber-50 text-amber-600"
          />
          <StatCard
            label="Inactive"
            value={inactiveCount}
            icon={UserX}
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
                placeholder="Search customers..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <p className="text-sm text-slate-400">
              {filteredCustomers.length} of {totalCustomers} customers
            </p>
          </div>

          {/* Table - desktop */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Company</th>
                  <th className="px-5 py-3 font-medium">Contact</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Last Contact</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="transition hover:bg-slate-50/80"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                          {customer.initials}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {customer.name}
                          </p>
                          <p className="text-xs text-slate-400">{customer.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {customer.company}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-slate-400" />
                          {customer.email}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-slate-400" />
                          {customer.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={customer.status} />
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {customer.lastContact}
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

            {filteredCustomers.length === 0 && (
              <div className="px-5 py-14 text-center text-sm text-slate-400">
                No customers match your search.
              </div>
            )}
          </div>

          {/* Cards - mobile */}
          <div className="divide-y divide-slate-100 md:hidden">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="flex flex-col gap-3 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                      {customer.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {customer.name}
                      </p>
                      <p className="text-xs text-slate-400">{customer.company}</p>
                    </div>
                  </div>
                  <StatusBadge status={customer.status} />
                </div>
                <div className="flex flex-col gap-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    {customer.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    {customer.phone}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Last contact: {customer.lastContact}
                </p>
              </div>
            ))}

            {filteredCustomers.length === 0 && (
              <div className="px-5 py-14 text-center text-sm text-slate-400">
                No customers match your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}