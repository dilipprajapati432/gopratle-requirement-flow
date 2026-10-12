import { ApiResponse, RequirementPayload } from "../types/requirement";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function createRequirement(
  payload: RequirementPayload
): Promise<ApiResponse> {
  const response = await fetch(`${API_URL}/requirements`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({
    success: false,
    message: "Invalid response from server"
  }));

  if (!response.ok) {
    throw new Error(data.message || "Unable to submit requirement");
  }

  return data;
}
