import { Category } from "../../types/requirement";

interface Props {
  id: string;
  category: Category;
  onReset: () => void;
}

export default function SuccessScreen({ id, category, onReset }: Props) {
  return (
    <div className="py-12 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
        ✓
      </div>
      <h2 className="mt-5 text-2xl font-bold text-gray-900">
        Requirement submitted successfully
      </h2>
      <p className="mx-auto mt-2 max-w-lg text-gray-600">
        Your requirement has been saved and categorised as{" "}
        <strong>{category}</strong>.
      </p>

      <div className="mx-auto mt-6 max-w-sm rounded-xl border border-gray-200 bg-gray-50 p-4 text-left text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-gray-500">Reference ID</span>
          <span className="font-mono font-medium">{id}</span>
        </div>
        <div className="mt-3 flex justify-between gap-4">
          <span className="text-gray-500">Category</span>
          <span className="font-medium capitalize">{category}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-7 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
      >
        Create another requirement
      </button>
    </div>
  );
}
