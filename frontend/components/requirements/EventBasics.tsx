import Input from "../ui/Input";
import Select from "../ui/Select";
import { Category, EventDetails } from "../../types/requirement";

interface Props {
  event: EventDetails;
  category: Category | "";
  onEventChange: (field: keyof EventDetails, value: string) => void;
  onCategoryChange: (category: Category) => void;
  errors: Record<string, string>;
}

const categories = [
  {
    value: "planner" as Category,
    title: "Event Planner",
    description: "Planning, coordination and event management"
  },
  {
    value: "performer" as Category,
    title: "Performer",
    description: "Artists, bands, DJs and other performers"
  },
  {
    value: "crew" as Category,
    title: "Crew",
    description: "Technical, production and event support crew"
  }
];

export default function EventBasics({
  event,
  category,
  onEventChange,
  onCategoryChange,
  errors
}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Event basics</h2>
        <p className="mt-1 text-sm text-gray-500">
          Start with the essential information about your event.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Input
            label="Event name"
            placeholder="e.g. College Cultural Fest"
            value={event.name}
            onChange={(e) => onEventChange("name", e.target.value)}
            error={errors.name}
          />
        </div>

        <Select
          label="Event type"
          value={event.type}
          onChange={(e) => onEventChange("type", e.target.value)}
          options={[
            { value: "Corporate Event", label: "Corporate Event" },
            { value: "Cultural Event", label: "Cultural Event" },
            { value: "Wedding", label: "Wedding" },
            { value: "Concert", label: "Concert" },
            { value: "Private Event", label: "Private Event" },
            { value: "Other", label: "Other" }
          ]}
          error={errors.type}
        />

        <Input
          label="Location"
          placeholder="e.g. Ahmedabad"
          value={event.location}
          onChange={(e) => onEventChange("location", e.target.value)}
          error={errors.location}
        />

        <Input
          label="Start date"
          type="date"
          value={event.startDate}
          onChange={(e) => onEventChange("startDate", e.target.value)}
          error={errors.startDate}
        />

        <Input
          label="End date"
          type="date"
          value={event.endDate}
          min={event.startDate || undefined}
          onChange={(e) => onEventChange("endDate", e.target.value)}
          error={errors.endDate}
        />

        <div className="sm:col-span-2">
          <Input
            label="Venue (optional)"
            placeholder="e.g. University Ground"
            value={event.venue}
            onChange={(e) => onEventChange("venue", e.target.value)}
          />
        </div>
      </div>

      <div>
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-700">What are you looking for?</p>
          {errors.category && (
            <p className="mt-1 text-xs text-red-600">{errors.category}</p>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {categories.map((item) => {
            const selected = category === item.value;

            return (
              <button
                type="button"
                key={item.value}
                onClick={() => onCategoryChange(item.value)}
                className={`rounded-2xl border p-4 text-left transition ${
                  selected
                    ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                    : "border-gray-200 bg-white hover:border-indigo-300"
                }`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{item.title}</span>
                  <span
                    className={`h-4 w-4 rounded-full border ${
                      selected
                        ? "border-indigo-600 bg-indigo-600"
                        : "border-gray-300"
                    }`}
                  />
                </div>
                <p className="text-xs leading-5 text-gray-500">{item.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
