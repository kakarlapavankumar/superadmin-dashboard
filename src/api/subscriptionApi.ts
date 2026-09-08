import type {
  Subscription,
  CreateSubscriptionInput,
  UpdateSubscriptionInput,
  SubscriptionStatus,
} from "../types/subscription";

import { subscriptions } from "../mock/subscriptions";

let subscriptionData = [...subscriptions];

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getSubscriptions(): Promise<Subscription[]> {
  await delay();

  return [...subscriptionData];
}

export async function getSubscription(id: number): Promise<Subscription> {
  await delay();

  const subscription = subscriptionData.find((item) => item.id === id);

  if (!subscription) {
    throw new Error("Subscription not found");
  }

  return { ...subscription };
}

export async function createSubscription(
  payload: CreateSubscriptionInput,
): Promise<Subscription> {
  await delay();

  const newSubscription: Subscription = {
    id:
      subscriptionData.length > 0
        ? Math.max(...subscriptionData.map((item) => item.id)) + 1
        : 1,

    ...payload,

    usedUsers: 0,
    usedStorage: 0,
    usedApiCalls: 0,

    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
  };

  subscriptionData.push(newSubscription);

  return { ...newSubscription };
}

export async function updateSubscription(
  id: number,
  payload: UpdateSubscriptionInput,
): Promise<Subscription> {
  await delay();

  const index = subscriptionData.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error("Subscription not found");
  }

  subscriptionData[index] = {
    ...subscriptionData[index],
    ...payload,
    updatedAt: new Date().toISOString().split("T")[0],
  };

  return { ...subscriptionData[index] };
}

export async function deleteSubscription(id: number): Promise<void> {
  await delay();

  const exists = subscriptionData.some((item) => item.id === id);

  if (!exists) {
    throw new Error("Subscription not found");
  }

  subscriptionData = subscriptionData.filter((item) => item.id !== id);
}

export async function updateSubscriptionStatus(
  id: number,
  status: SubscriptionStatus,
): Promise<Subscription> {
  await delay();

  const index = subscriptionData.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error("Subscription not found");
  }

  subscriptionData[index] = {
    ...subscriptionData[index],
    status,
    updatedAt: new Date().toISOString().split("T")[0],
  };

  return { ...subscriptionData[index] };
}

export async function toggleAutoRenew(id: number): Promise<Subscription> {
  await delay();

  const index = subscriptionData.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error("Subscription not found");
  }

  subscriptionData[index] = {
    ...subscriptionData[index],
    autoRenew: !subscriptionData[index].autoRenew,
    updatedAt: new Date().toISOString().split("T")[0],
  };

  return { ...subscriptionData[index] };
}
