import {
  dashboardStats,
  platformHealth,
  tenantGrowth,
  activities,
} from "../mock/dashboard";

export async function getDashboardStats() {
  return dashboardStats;
}

export async function getPlatformHealth() {
  return platformHealth;
}

export async function getTenantGrowth() {
  return tenantGrowth;
}

export async function getRecentActivities() {
  return activities;
}
