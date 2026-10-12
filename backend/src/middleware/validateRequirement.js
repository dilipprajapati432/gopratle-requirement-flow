const categories = ["planner", "performer", "crew"];

const commonRequired = [
  ["event.name", "Event name is required"],
  ["event.type", "Event type is required"],
  ["event.startDate", "Start date is required"],
  ["event.endDate", "End date is required"],
  ["event.location", "Location is required"],
  ["category", "Category is required"]
];

const categoryRequired = {
  planner: [
    ["details.eventSize", "Event size is required"],
    ["details.servicesRequired", "Services required is required"],
    ["details.attendees", "Estimated attendees is required"],
    ["details.budget", "Budget is required"]
  ],
  performer: [
    ["details.performanceType", "Performance type is required"],
    ["details.experience", "Experience is required"],
    ["details.duration", "Performance duration is required"],
    ["details.teamSize", "Team size is required"],
    ["details.budget", "Budget is required"]
  ],
  crew: [
    ["details.role", "Crew role is required"],
    ["details.numberOfCrew", "Number of crew members is required"],
    ["details.experience", "Experience is required"],
    ["details.workingHours", "Working hours are required"],
    ["details.budget", "Budget is required"]
  ]
};

function readPath(object, path) {
  return path.split(".").reduce((value, key) => value?.[key], object);
}

export function validateRequirement(req, res, next) {
  const body = req.body || {};

  for (const [path, message] of commonRequired) {
    const value = readPath(body, path);
    if (value === undefined || value === null || String(value).trim() === "") {
      return res.status(400).json({ success: false, message });
    }
  }

  if (!categories.includes(body.category)) {
    return res.status(400).json({
      success: false,
      message: "Category must be planner, performer, or crew"
    });
  }

  const start = new Date(body.event.startDate);
  const end = new Date(body.event.endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return res.status(400).json({
      success: false,
      message: "Please provide valid event dates"
    });
  }

  if (end < start) {
    return res.status(400).json({
      success: false,
      message: "End date cannot be before start date"
    });
  }

  for (const [path, message] of categoryRequired[body.category]) {
    const value = readPath(body, path);
    if (value === undefined || value === null || String(value).trim() === "") {
      return res.status(400).json({ success: false, message });
    }
  }

  next();
}
