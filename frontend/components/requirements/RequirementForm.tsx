"use client";

import { useMemo, useState } from "react";
import StepIndicator from "./StepIndicator";
import EventBasics from "./EventBasics";
import CategoryDetails from "./CategoryDetails";
import AdditionalDetails from "./AdditionalDetails";
import ReviewStep from "./ReviewStep";
import SuccessScreen from "./SuccessScreen";
import { createRequirement } from "../../lib/api";
import { Category, EventDetails, RequirementPayload } from "../../types/requirement";

const steps = ["Event Basics", "Category", "Details", "Review"];

const initialEvent: EventDetails = {
  name: "",
  type: "",
  startDate: "",
  endDate: "",
  location: "",
  venue: ""
};

export default function RequirementForm() {
  const [step, setStep] = useState(1);
  const [event, setEvent] = useState<EventDetails>(initialEvent);
  const [category, setCategory] = useState<Category | "">("");
  const [details, setDetails] = useState<Record<string, string | number>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState<{ id: string; category: Category } | null>(
    null
  );

  const selectedCategory = category as Category;

  const updateEvent = (field: keyof EventDetails, value: string) => {
    setEvent((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const updateDetails = (field: string, value: string | number) => {
    setDetails((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const validateStep = () => {
    const nextErrors: Record<string, string> = {};

    if (step === 1) {
      if (!event.name.trim()) nextErrors.name = "Event name is required";
      if (!event.type) nextErrors.type = "Event type is required";
      if (!event.location.trim()) nextErrors.location = "Location is required";
      if (!event.startDate) nextErrors.startDate = "Start date is required";
      if (!event.endDate) nextErrors.endDate = "End date is required";
      if (
        event.startDate &&
        event.endDate &&
        event.endDate < event.startDate
      ) {
        nextErrors.endDate = "End date cannot be before start date";
      }
      if (!category) nextErrors.category = "Please select a category";
    }

    if (step === 2 && !category) {
      nextErrors.category = "Please select a category first";
    }

    if (step === 2 || step === 3) {
      if (category === "planner") {
        if (!details.eventSize) nextErrors.eventSize = "Event size is required";
        if (!details.servicesRequired) {
          nextErrors.servicesRequired = "Services required is required";
        }
        if (!details.attendees) nextErrors.attendees = "Attendees are required";
        if (!details.budget && details.budget !== 0) {
          nextErrors.budget = "Budget is required";
        }
      }

      if (category === "performer") {
        if (!details.performanceType) {
          nextErrors.performanceType = "Performance type is required";
        }
        if (!details.experience) nextErrors.experience = "Experience is required";
        if (!details.duration) nextErrors.duration = "Duration is required";
        if (!details.teamSize) nextErrors.teamSize = "Team size is required";
        if (!details.budget && details.budget !== 0) {
          nextErrors.budget = "Budget is required";
        }
      }

      if (category === "crew") {
        if (!details.role) nextErrors.role = "Crew role is required";
        if (!details.numberOfCrew) {
          nextErrors.numberOfCrew = "Number of crew members is required";
        }
        if (!details.experience) nextErrors.experience = "Experience is required";
        if (!details.workingHours) {
          nextErrors.workingHours = "Working hours are required";
        }
        if (!details.budget && details.budget !== 0) {
          nextErrors.budget = "Budget is required";
        }
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const next = () => {
    if (validateStep()) {
      setStep((current) => Math.min(current + 1, 4));
    }
  };

  const back = () => {
    setErrors({});
    setSubmitError("");
    setStep((current) => Math.max(current - 1, 1));
  };

  const payload = useMemo<RequirementPayload | null>(() => {
    if (!category) return null;
    return {
      event,
      category,
      details
    };
  }, [event, category, details]);

  const submit = async () => {
    if (!payload || !validateStep()) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await createRequirement(payload);

      if (!response.data) {
        throw new Error("The server did not return a requirement ID");
      }

      setSuccess({
        id: response.data.id,
        category: response.data.category
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to submit requirement"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setStep(1);
    setEvent(initialEvent);
    setCategory("");
    setDetails({});
    setErrors({});
    setSubmitError("");
    setSuccess(null);
  };

  if (success) {
    return (
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
        <SuccessScreen id={success.id} category={success.category} onReset={reset} />
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
      <StepIndicator currentStep={step} steps={steps} />

      <div className="min-h-[420px]">
        {step === 1 && (
          <EventBasics
            event={event}
            category={category}
            onEventChange={updateEvent}
            onCategoryChange={(value) => {
              setCategory(value);
              setErrors((current) => ({ ...current, category: "" }));
              setDetails({});
            }}
            errors={errors}
          />
        )}

        {step === 2 && category && (
          <CategoryDetails
            category={selectedCategory}
            details={details}
            onChange={updateDetails}
            errors={errors}
          />
        )}

        {step === 3 && category && (
          <AdditionalDetails details={details} onChange={updateDetails as any} />
        )}

        {step === 4 && category && (
          <ReviewStep event={event} category={selectedCategory} details={details} />
        )}
      </div>

      {submitError && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {submitError}
        </div>
      )}

      <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
        <button
          type="button"
          onClick={back}
          disabled={step === 1 || submitting}
          className="rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40"
        >
          Back
        </button>

        {step < 4 ? (
          <button
            type="button"
            onClick={next}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit requirement"}
          </button>
        )}
      </div>
    </div>
  );
}
