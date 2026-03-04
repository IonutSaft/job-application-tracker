"use client";

import { Application } from "@/lib/hooks";
import { formatDistanceToNow } from "date-fns";

const statusColors = {
  APPLIED: { bg: "bg-blue-100", text: "text-blue-800", label: "Applied" },
  INTERVIEWING: {
    bg: "bg-purple-100",
    text: "text-purple-800",
    label: "Interviewing",
  },
  OFFER: { bg: "bg-green-100", text: "text-green-800", label: "Offer" },
  REJECTED: { bg: "bg-red-100", text: "text-red-800", label: "Rejected" },
};

interface ApplicationCardProps {
  application: Application;
  onEdit: (application: Application) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Application["status"]) => void;
}

export function ApplicationCard({
  application,
  onEdit,
  onDelete,
  onStatusChange,
}: ApplicationCardProps) {
  const statusInfo = statusColors[application.status];
  const appliedDate = new Date(application.appliedAt);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {application.company}
          </h3>
          <p className="text-sm text-gray-600">{application.role}</p>
          <p className="text-xs text-gray-500 mt-1">
            Position: {application.position}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.bg} ${statusInfo.text}`}
        >
          {statusInfo.label}
        </span>
      </div>

      {application.notes && (
        <p className="text-sm text-gray-700 mb-4 p-3 bg-gray-50 rounded">
          {application.notes}
        </p>
      )}

      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-500">
          Applied {formatDistanceToNow(appliedDate, { addSuffix: true })}
        </p>
        {application.url && (
          <a
            href={application.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-800 underline"
          >
            View Job
          </a>
        )}
      </div>

      <div className="flex gap-2 mb-3">
        <select
          value={application.status}
          onChange={(e) =>
            onStatusChange(
              application.id,
              e.target.value as Application["status"],
            )
          }
          className="text-xs border rounded px-2 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEWING">Interviewing</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-200">
        <button
          onClick={() => onEdit(application)}
          className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(application.id)}
          className="flex-1 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
