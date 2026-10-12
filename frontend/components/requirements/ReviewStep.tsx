import { Category, EventDetails } from "../../types/requirement";

interface Props {
  event: EventDetails;
  category: Category;
  details: Record<string, string | number>;
}

const labels: Record<string, string> = {
  eventSize: "Event size",
  experience: "Experience",
  attendees: "Estimated attendees",
  budget: "Budget",
  servicesRequired: "Services required",
  additionalRequirements: "Additional requirements",
  performanceType: "Performance type",
  genre: "Genre / style",
  duration: "Performance duration",
  teamSize: "Team size",
  technicalRequirements: "Technical requirements",
  role: "Crew role",
  numberOfCrew: "Number of crew members",
  workingHours: "Working hours",
  equipmentSkills: "Equipment / skills",
  additionalNotes: "Additional notes"
};

function title(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function ReviewStep({ event, category, details }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Review your requirement</h2>
        <p className="mt-1 text-sm text-gray-500">
          Check the information before sending it to the backend.
        </p>
      </div>

      <section className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <h3 className="mb-4 font-semibold text-gray-900">Event</h3>
        <div className="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-medium">{event.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Type</p>
            <p className="font-medium">{event.type}</p>
          </div>
          <div>
            <p className="text-gray-500">Dates</p>
            <p className="font-medium">
              {event.startDate} to {event.endDate}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Location</p>
            <p className="font-medium">{event.location}</p>
          </div>
          {event.venue && (
            <div>
              <p className="text-gray-500">Venue</p>
              <p className="font-medium">{event.venue}</p>
            </div>
          )}
          <div>
            <p className="text-gray-500">Category</p>
            <p className="font-medium">{title(category)}</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <h3 className="mb-4 font-semibold text-gray-900">Category details</h3>
        <div className="grid gap-4 text-sm sm:grid-cols-2">
          {Object.entries(details)
            .filter(([, value]) => String(value).trim() !== "")
            .map(([key, value]) => (
              <div key={key} className="break-words">
                <p className="text-gray-500">{labels[key] || key}</p>
                <p className="font-medium text-gray-900">{String(value)}</p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
