"use client";

import { useEffect, useState } from "react";

export interface Application {
  id: string;
  company: string;
  role: string;
  position: string;
  status: "APPLIED" | "INTERVIEWING" | "OFFER" | "REJECTED";
  appliedAt: string;
  updatedAt: string;
  notes: string | null;
  url: string | null;
}

export function useApplications(status?: string) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    async function fetchApplications() {
      try {
        const url = new URL("/api/applications", window.location.origin);
        if (status && status !== "all") {
          url.searchParams.set("status", status);
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await response.json();
        setApplications(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, [status]);

  return { applications, loading, error };
}

export function useCreateApplication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async ({
    company,
    role,
    position,
    url,
    notes,
  }: {
    company: string;
    role: string;
    position: string;
    url?: string;
    notes?: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, role, position, url, notes }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create application");
      }

      return await response.json();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
}

export function useUpdateApplication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: string, updates: Partial<Application>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update application");
      }

      return await response.json();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
}

export function useDeleteApplication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete application");
      }

      return await response.json();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
}
