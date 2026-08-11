export interface BlueprintData {
  where?: string;
  what?: string;
  scale?: string;
  summary?: string;
}

export interface LeadSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  building: string;
  problem?: string;
  budget?: string;
  timeline?: string;
  blueprint?: BlueprintData;
  source?: string;
  createdAt: string;
  status: "new" | "contacted" | "archived";
}

export interface WaitlistSubmission {
  id: string;
  email: string;
  source?: string; // e.g. 'footer', 'blog', product slug
  productSlug?: string;
  createdAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
