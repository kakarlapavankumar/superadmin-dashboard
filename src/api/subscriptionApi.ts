import { licenses, subscriptions } from "../mock/subscriptions";
import type { License, Subscription } from "../types/subscription";

const subscriptionData = [...subscriptions];

export const getSubscriptions = async (): Promise<Subscription[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return [...subscriptionData];
};

export const getSubscription = async (
  id: number,
): Promise<Subscription | undefined> => {
  return subscriptionData.find((item) => item.id === id);
};

export const createSubscription = async (
  data: Omit<Subscription, "id" | "createdAt" | "tenantCount">,
): Promise<Subscription> => {
  const item: Subscription = {
    ...data,
    id: Date.now(),
    tenantCount: 0,
    createdAt: new Date().toISOString().split("T")[0],
  };

  subscriptionData.push(item);

  return item;
};

export const updateSubscription = async (
  id: number,
  data: Partial<Subscription>,
): Promise<Subscription> => {
  const index = subscriptionData.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error("Subscription not found");
  }

  subscriptionData[index] = {
    ...subscriptionData[index],
    ...data,
  };

  return subscriptionData[index];
};

export const getLicenses = async (): Promise<License[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return [...licenses];
};
