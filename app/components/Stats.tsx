"use client";

import { Application } from "@/lib/hooks";

interface StatsProps {
  applications: Application[];
}

export function Stats({ applications }: StatsProps) {
  const stats = {
    total: applications.length,
    applied: applications.filter((a) => a.status === "APPLIED").length,
    interviewing: applications.filter((a) => a.status === "INTERVIEWING")
      .length,
    offer: applications.filter((a) => a.status === "OFFER").length,
    rejected: applications.filter((a) => a.status === "REJECTED").length,
  };

  const statItems = [
    { label: "Total", value: stats.total, color: "bg-blue-100 text-blue-800" },
    {
      label: "Applied",
      value: stats.applied,
      color: "bg-blue-100 text-blue-800",
    },
    {
      label: "Interviewing",
      value: stats.interviewing,
      color: "bg-purple-100 text-purple-800",
    },
    {
      label: "Offers",
      value: stats.offer,
      color: "bg-green-100 text-green-800",
    },
    {
      label: "Rejected",
      value: stats.rejected,
      color: "bg-red-100 text-red-800",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {statItems.map((item) => (
        <div
          key={item.label}
          className={`rounded-lg p-4 text-center ${item.color}`}
        >
          <div className="text-2xl sm:text-3xl font-bold">{item.value}</div>
          <div className="text-xs sm:text-sm font-medium mt-1">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
