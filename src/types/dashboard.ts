export interface PlatformHealth {
  api: {
    status: "Operational" | "Degraded" | "Down";
    uptime: string;
  };

  database: {
    status: "Operational" | "Degraded" | "Down";
    uptime: string;
  };

  authentication: {
    status: "Operational" | "Degraded" | "Down";
    uptime: string;
  };

  storage: {
    status: "Operational" | "Degraded" | "Down";
    uptime: string;
  };
}

export const platformHealth: PlatformHealth = {
  api: {
    status: "Operational",
    uptime: "99.99%",
  },
  database: {
    status: "Operational",
    uptime: "99.98%",
  },
  authentication: {
    status: "Operational",
    uptime: "99.97%",
  },
  storage: {
    status: "Operational",
    uptime: "99.96%",
  },
};
