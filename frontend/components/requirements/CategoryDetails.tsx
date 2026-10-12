import Input from "../ui/Input";
import Select from "../ui/Select";
import Textarea from "../ui/Textarea";
import { Category } from "../../types/requirement";

interface Props {
  category: Category;
  details: Record<string, string | number>;
  onChange: (field: string, value: string | number) => void;
  errors: Record<string, string>;
}

export default function CategoryDetails({
  category,
  details,
  onChange,
  errors
}: Props) {
  const value = (key: string) => details[key] ?? "";

  if (category === "planner") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Planner requirements</h2>
          <p className="mt-1 text-sm text-gray-500">
            Tell us what kind of planning and coordination support you need.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Select
            label="Event size"
            value={String(value("eventSize"))}
            onChange={(e) => onChange("eventSize", e.target.value)}
            options={[
              { value: "Small", label: "Small" },
              { value: "Medium", label: "Medium" },
              { value: "Large", label: "Large" },
              { value: "Enterprise", label: "Enterprise" }
            ]}
            error={errors.eventSize}
          />
          <Input
            label="Planning experience required"
            placeholder="e.g. 2+ years"
            value={String(value("experience"))}
            onChange={(e) => onChange("experience", e.target.value)}
          />
          <Input
            label="Estimated attendees"
            type="number"
            min="1"
            placeholder="e.g. 500"
            value={String(value("attendees"))}
            onChange={(e) => onChange("attendees", Number(e.target.value))}
            error={errors.attendees}
          />
          <Input
            label="Budget (₹)"
            type="number"
            min="0"
            placeholder="e.g. 50000"
            value={String(value("budget"))}
            onChange={(e) => onChange("budget", Number(e.target.value))}
            error={errors.budget}
          />
          <div className="sm:col-span-2">
            <Textarea
              label="Services required"
              placeholder="Describe the planning services you need..."
              value={String(value("servicesRequired"))}
              onChange={(e) => onChange("servicesRequired", e.target.value)}
            />
            {errors.servicesRequired && (
              <p className="mt-1 text-xs text-red-600">{errors.servicesRequired}</p>
            )}
          </div>
          <div className="sm:col-span-2">
            <Textarea
              label="Additional requirements"
              placeholder="Anything else the planner should know?"
              value={String(value("additionalRequirements"))}
              onChange={(e) => onChange("additionalRequirements", e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  }

  if (category === "performer") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Performer requirements</h2>
          <p className="mt-1 text-sm text-gray-500">
            Describe the performer and performance you are looking for.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Select
            label="Performance type"
            value={String(value("performanceType"))}
            onChange={(e) => onChange("performanceType", e.target.value)}
            options={[
              { value: "Live Band", label: "Live Band" },
              { value: "DJ", label: "DJ" },
              { value: "Singer", label: "Singer" },
              { value: "Dancer", label: "Dancer" },
              { value: "Other", label: "Other" }
            ]}
            error={errors.performanceType}
          />
          <Input
            label="Genre / style"
            placeholder="e.g. Rock, Bollywood, EDM"
            value={String(value("genre"))}
            onChange={(e) => onChange("genre", e.target.value)}
          />
          <Input
            label="Experience"
            placeholder="e.g. 2+ years"
            value={String(value("experience"))}
            onChange={(e) => onChange("experience", e.target.value)}
            error={errors.experience}
          />
          <Input
            label="Performance duration"
            placeholder="e.g. 60 minutes"
            value={String(value("duration"))}
            onChange={(e) => onChange("duration", e.target.value)}
            error={errors.duration}
          />
          <Input
            label="Team size"
            type="number"
            min="1"
            placeholder="e.g. 5"
            value={String(value("teamSize"))}
            onChange={(e) => onChange("teamSize", Number(e.target.value))}
            error={errors.teamSize}
          />
          <Input
            label="Budget (₹)"
            type="number"
            min="0"
            placeholder="e.g. 25000"
            value={String(value("budget"))}
            onChange={(e) => onChange("budget", Number(e.target.value))}
            error={errors.budget}
          />
          <div className="sm:col-span-2">
            <Textarea
              label="Technical requirements"
              placeholder="Sound, lighting, stage or equipment requirements..."
              value={String(value("technicalRequirements"))}
              onChange={(e) => onChange("technicalRequirements", e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Crew requirements</h2>
        <p className="mt-1 text-sm text-gray-500">
          Tell us about the event crew and support you need.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Crew role"
          placeholder="e.g. Sound Engineer"
          value={String(value("role"))}
          onChange={(e) => onChange("role", e.target.value)}
          error={errors.role}
        />
        <Input
          label="Number of crew members"
          type="number"
          min="1"
          placeholder="e.g. 4"
          value={String(value("numberOfCrew"))}
          onChange={(e) => onChange("numberOfCrew", Number(e.target.value))}
          error={errors.numberOfCrew}
        />
        <Input
          label="Experience"
          placeholder="e.g. 2+ years"
          value={String(value("experience"))}
          onChange={(e) => onChange("experience", e.target.value)}
          error={errors.experience}
        />
        <Input
          label="Working hours"
          placeholder="e.g. 8 hours/day"
          value={String(value("workingHours"))}
          onChange={(e) => onChange("workingHours", e.target.value)}
          error={errors.workingHours}
        />
        <Input
          label="Budget (₹)"
          type="number"
          min="0"
          placeholder="e.g. 15000"
          value={String(value("budget"))}
          onChange={(e) => onChange("budget", Number(e.target.value))}
          error={errors.budget}
        />
        <div className="sm:col-span-2">
          <Textarea
            label="Equipment / skills required"
            placeholder="List relevant equipment, certifications or skills..."
            value={String(value("equipmentSkills"))}
            onChange={(e) => onChange("equipmentSkills", e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <Textarea
            label="Additional requirements"
            placeholder="Anything else the crew should know?"
            value={String(value("additionalRequirements"))}
            onChange={(e) => onChange("additionalRequirements", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
