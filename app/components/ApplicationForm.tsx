"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Application } from "@/lib/hooks";

interface ApplicationFormProps {
  application?: Application;
  onSubmit: (data: {
    company: string;
    role: string;
    position: string;
    url?: string;
    notes?: string;
  }) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ApplicationForm({
  application,
  onSubmit,
  onCancel,
  isLoading,
}: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    company: application?.company || "",
    role: application?.role || "",
    position: application?.position || "",
    url: application?.url || "",
    notes: application?.notes || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }
    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    }
    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await onSubmit({
        company: formData.company.trim(),
        role: formData.role.trim(),
        position: formData.position.trim(),
        url: formData.url.trim() || undefined,
        notes: formData.notes.trim() || undefined,
      });
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Company Name"
        placeholder="e.g., Google"
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        error={errors.company}
        required
      />

      <Input
        label="Role"
        placeholder="e.g., Senior Software Engineer"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        error={errors.role}
        required
      />

      <Input
        label="Position"
        placeholder="e.g., Full-time"
        value={formData.position}
        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
        error={errors.position}
        required
      />

      <Input
        label="Job URL (Optional)"
        placeholder="https://example.com/jobs/..."
        type="url"
        value={formData.url}
        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
      />

      <Textarea
        label="Notes (Optional)"
        placeholder="Add any notes about this application..."
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        rows={4}
      />

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          isLoading={submitting || isLoading}
          className="flex-1"
        >
          {application ? "Update Application" : "Add Application"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={submitting || isLoading}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
