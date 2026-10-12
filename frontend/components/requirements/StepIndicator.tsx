interface Props {
  currentStep: number;
  steps: string[];
}

export default function StepIndicator({ currentStep, steps }: Props) {
  return (
    <div className="mb-8 flex items-center justify-between">
      {steps.map((step, index) => {
        const number = index + 1;
        const active = number === currentStep;
        const complete = number < currentStep;

        return (
          <div key={step} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                  active || complete
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {complete ? "✓" : number}
              </div>
              <span
                className={`mt-2 hidden text-xs font-medium sm:block ${
                  active ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {step}
              </span>
            </div>
            {number < steps.length && (
              <div
                className={`mx-2 h-px flex-1 ${
                  number < currentStep ? "bg-indigo-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
