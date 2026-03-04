"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Button,
  ApplicationCard,
  ApplicationForm,
  Modal,
  Alert,
  Stats,
  Navigation,
  Select,
} from "@/app/components";
import {
  useApplications,
  useCreateApplication,
  useUpdateApplication,
  useDeleteApplication,
  Application,
} from "@/lib/hooks";

export default function DashboardPage() {
  const { status } = useSession();
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState("appliedAt");
  const [showModal, setShowModal] = useState(false);
  const [editingApplication, setEditingApplication] =
    useState<Application | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch all applications for stats
  const { applications: allApplications, loading: allLoading } =
    useApplications(undefined);
  // Fetch filtered applications for display
  const { applications, loading, error } = useApplications(
    statusFilter === "all" ? undefined : statusFilter,
  );
  const { create, loading: createLoading } = useCreateApplication();
  const { update, loading: updateLoading } = useUpdateApplication();
  const { remove } = useDeleteApplication();

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  const handleAddClick = () => {
    setEditingApplication(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingApplication(null);
  };

  const handleFormSubmit = async (data: {
    company: string;
    role: string;
    position: string;
    url?: string;
    notes?: string;
  }) => {
    try {
      if (editingApplication) {
        await update(editingApplication.id, data);
        setSuccessMessage("Application updated successfully!");
      } else {
        await create(data);
        setSuccessMessage("Application added successfully!");
      }
      handleModalClose();
      // Reload applications
      window.location.reload();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleStatusChange = async (
    id: string,
    newStatus: Application["status"],
  ) => {
    try {
      await update(id, { status: newStatus });
      setSuccessMessage("Status updated successfully!");
      window.location.reload();
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to update status",
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return;

    try {
      await remove(id);
      setSuccessMessage("Application deleted successfully!");
      window.location.reload();
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to delete application",
      );
    }
  };

  const handleEdit = (application: Application) => {
    setEditingApplication(application);
    setShowModal(true);
  };

  const getEmptyStateMessage = () => {
    if (allApplications.length === 0) {
      return {
        title: "No applications yet",
        description: "Get started by adding your first job application.",
        showButton: true,
      };
    }

    const statusLabels: { [key: string]: string } = {
      APPLIED: "job applications",
      INTERVIEWING: "job interviews",
      OFFER: "job offers",
      REJECTED: "rejected applications",
    };

    const statusLabel = statusLabels[statusFilter] || "applications";
    return {
      title: `No ${statusLabel}`,
      description: `You haven't received any ${statusLabel} yet. Keep applying!`,
      showButton: false,
    };
  };

  const emptyState = getEmptyStateMessage();

  const sortedApplications = [...applications].sort((a, b) => {
    switch (sortBy) {
      case "appliedAt":
        return (
          new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
        );
      case "-appliedAt":
        return (
          new Date(a.appliedAt).getTime() - new Date(b.appliedAt).getTime()
        );
      case "company":
        return a.company.localeCompare(b.company);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts */}
        {successMessage && (
          <Alert
            type="success"
            message={successMessage}
            onClose={() => setSuccessMessage(null)}
          />
        )}
        {errorMessage && (
          <Alert
            type="error"
            message={errorMessage}
            onClose={() => setErrorMessage(null)}
          />
        )}
        {error && (
          <Alert
            type="error"
            message={error}
            onClose={() => setErrorMessage(null)}
          />
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Job Applications
              </h1>
              <p className="text-gray-600 mt-1">
                Monitor and track your job applications
              </p>
            </div>
            <Button onClick={handleAddClick} className="w-full sm:w-auto">
              + Add Application
            </Button>
          </div>
        </div>

        {/* Stats */}
        {!allLoading && <Stats applications={allApplications} />}

        {/* Filters */}
        {allApplications.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "all", label: "All Statuses" },
                { value: "APPLIED", label: "Applied" },
                { value: "INTERVIEWING", label: "Interviewing" },
                { value: "OFFER", label: "Offer" },
                { value: "REJECTED", label: "Rejected" },
              ]}
            />
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                { value: "appliedAt", label: "Sort by Date (Newest)" },
                { value: "-appliedAt", label: "Sort by Date (Oldest)" },
                { value: "company", label: "Sort by Company (A-Z)" },
              ]}
            />
          </div>
        )}

        {/* Applications Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading applications...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {emptyState.title}
            </h3>
            <p className="text-gray-600 mb-6">{emptyState.description}</p>
            {emptyState.showButton && (
              <Button onClick={handleAddClick}>
                Add Your First Application
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedApplications.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        title={editingApplication ? "Edit Application" : "Add New Application"}
      >
        <ApplicationForm
          application={editingApplication || undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleModalClose}
          isLoading={createLoading || updateLoading}
        />
      </Modal>
    </div>
  );
}
