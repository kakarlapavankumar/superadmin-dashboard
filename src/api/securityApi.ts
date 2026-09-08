import {
  activeSessions,
  securityEvents,
  securityOverview,
  securitySettings,
} from "../mock/security";

import type {
  ActiveSession,
  SecurityEvent,
  SecurityOverview,
  SecuritySetting,
} from "../types/security";

export const securityApi = {
  getOverview: async (): Promise<SecurityOverview> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return securityOverview;
  },

  getSettings: async (): Promise<SecuritySetting[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return securitySettings;
  },

  getEvents: async (): Promise<SecurityEvent[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return securityEvents;
  },

  getActiveSessions: async (): Promise<ActiveSession[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return activeSessions;
  },

  updateSetting: async (
    id: string,
    enabled: boolean,
  ): Promise<SecuritySetting> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const setting = securitySettings.find((item) => item.id === id);

    if (!setting) {
      throw new Error("Security setting not found");
    }

    setting.enabled = enabled;
    setting.lastUpdated = new Date().toISOString();

    return setting;
  },

  resolveEvent: async (id: string): Promise<SecurityEvent> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const event = securityEvents.find((item) => item.id === id);

    if (!event) {
      throw new Error("Security event not found");
    }

    event.resolved = true;

    return event;
  },

  terminateSession: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const index = activeSessions.findIndex((session) => session.id === id);

    if (index === -1) {
      throw new Error("Session not found");
    }

    activeSessions.splice(index, 1);
  },
};
