import {
  monitoringIncidents,
  monitoringMetrics,
  monitoringOverview,
  serviceHealth,
} from "../mock/monitoring";

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const monitoringApi = {
  async getOverview() {
    await delay();

    return monitoringOverview;
  },

  async getServices() {
    await delay();

    return serviceHealth;
  },

  async getMetrics() {
    await delay();

    return monitoringMetrics;
  },

  async getIncidents() {
    await delay();

    return monitoringIncidents;
  },
};
