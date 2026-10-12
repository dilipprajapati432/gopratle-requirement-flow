import Textarea from "../ui/Textarea";

interface Props {
  details: Record<string, string | number>;
  onChange: (field: string, value: string | number) => void;
}

export default function AdditionalDetails({ details, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Additional details</h2>
        <p className="mt-1 text-sm text-gray-500">
          Add anything important that has not been covered yet.
        </p>
      </div>

      <Textarea
        label="Notes and special requirements"
        placeholder="Share any timing, access, equipment, coordination or other details..."
        value={String(details.additionalNotes ?? "")}
        onChange={(e) => onChange("additionalNotes", e.target.value)}
      />

      <div className="rounded-xl bg-indigo-50 p-4 text-sm text-indigo-900">
        <strong>Tip:</strong> Clear requirements make it easier to understand the
        scope of the request.
      </div>
    </div>
  );
}
