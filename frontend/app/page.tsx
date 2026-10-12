import RequirementForm from "../components/requirements/RequirementForm";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
            GoPratle
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Post your event requirement
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Tell us what you need. We&apos;ll use your requirements to understand
            the right planner, performer, or crew category.
          </p>
        </div>
        <RequirementForm />
      </div>
    </main>
  );
}
