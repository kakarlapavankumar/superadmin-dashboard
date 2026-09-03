import { features } from "../mock/features";

import type {
  CreateFeatureInput,
  Feature,
  UpdateFeatureInput,
} from "../types/feature";

let featureData: Feature[] = [...features];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getFeatures(): Promise<Feature[]> {
  await delay(400);

  return [...featureData];
}

export async function getFeature(id: number): Promise<Feature> {
  await delay(300);

  const feature = featureData.find((item) => item.id === id);

  if (!feature) {
    throw new Error("Feature not found");
  }

  return { ...feature };
}

export async function createFeature(
  data: CreateFeatureInput,
): Promise<Feature> {
  await delay(500);

  const existingFeature = featureData.find(
    (item) => item.key.toLowerCase() === data.key.toLowerCase(),
  );

  if (existingFeature) {
    throw new Error("A feature with this key already exists.");
  }

  const newFeature: Feature = {
    id: Date.now(),
    name: data.name,
    key: data.key,
    description: data.description,
    status: data.status,
    tenantCount: 0,
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
  };

  featureData = [newFeature, ...featureData];

  return { ...newFeature };
}

export async function updateFeature(
  id: number,
  data: UpdateFeatureInput,
): Promise<Feature> {
  await delay(500);

  const index = featureData.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error("Feature not found");
  }

  const updatedFeature: Feature = {
    ...featureData[index],
    ...data,
    updatedAt: new Date().toISOString().split("T")[0],
  };

  featureData[index] = updatedFeature;

  return { ...updatedFeature };
}

export async function deleteFeature(id: number): Promise<void> {
  await delay(400);

  const exists = featureData.some((item) => item.id === id);

  if (!exists) {
    throw new Error("Feature not found");
  }

  featureData = featureData.filter((item) => item.id !== id);
}

export async function toggleFeature(id: number): Promise<Feature> {
  await delay(400);

  const feature = featureData.find((item) => item.id === id);

  if (!feature) {
    throw new Error("Feature not found");
  }

  feature.status = feature.status === "Active" ? "Inactive" : "Active";

  feature.updatedAt = new Date().toISOString().split("T")[0];

  return { ...feature };
}
