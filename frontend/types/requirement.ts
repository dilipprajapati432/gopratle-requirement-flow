export type Category = "planner" | "performer" | "crew";

export interface EventDetails {
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  location: string;
  venue: string;
}

export interface RequirementPayload {
  event: EventDetails;
  category: Category;
  details: Record<string, string | number>;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    category: Category;
    createdAt: string;
  };
}
