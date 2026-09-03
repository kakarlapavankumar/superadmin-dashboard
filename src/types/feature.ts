export type FeatureStatus = "Active" | "Inactive";

export interface Feature {
  id: number;
  name: string;
  key: string;
  description: string;
  status: FeatureStatus;
  tenantCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFeatureInput {
  name: string;
  key: string;
  description: string;
  status: FeatureStatus;
}

export interface UpdateFeatureInput {
  name?: string;
  key?: string;
  description?: string;
  status?: FeatureStatus;
}
