import {
  reportsOverview,
  revenueReports,
  tenantGrowthReports,
  userGrowthReports,
  usageReports,
  reportSummaries,
} from "../mock/reports";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const reportsApi = {
  async getOverview() {
    await delay(500);
    return reportsOverview;
  },

  async getRevenueReports() {
    await delay(500);
    return revenueReports;
  },

  async getTenantGrowthReports() {
    await delay(500);
    return tenantGrowthReports;
  },

  async getUserGrowthReports() {
    await delay(500);
    return userGrowthReports;
  },

  async getUsageReports() {
    await delay(500);
    return usageReports;
  },

  async getReportSummaries() {
    await delay(500);
    return reportSummaries;
  },
};
