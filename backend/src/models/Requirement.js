import mongoose from "mongoose";

const requirementSchema = new mongoose.Schema(
  {
    event: {
      name: { type: String, required: true, trim: true },
      type: { type: String, required: true, trim: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      location: { type: String, required: true, trim: true },
      venue: { type: String, trim: true, default: "" }
    },
    category: {
      type: String,
      enum: ["planner", "performer", "crew"],
      required: true
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  },
  { timestamps: true }
);

requirementSchema.pre("validate", function (next) {
  if (
    this.event?.startDate &&
    this.event?.endDate &&
    this.event.endDate < this.event.startDate
  ) {
    this.invalidate("event.endDate", "End date cannot be before start date");
  }
  next();
});

export default mongoose.model("Requirement", requirementSchema);
