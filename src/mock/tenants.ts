import type { Tenant } from "../types/tenant";

const companies = [
  "Acme Corporation",
  "TechNova Solutions",
  "Alpha Technologies",
  "CloudPeak Systems",
  "BrightPath Solutions",
  "NextGen Software",
  "Vertex Digital",
  "BlueSky Technologies",
  "InnoWave Systems",
  "PrimeCloud Solutions",
  "GlobalTech Services",
  "SmartEdge Technologies",
  "Apex Solutions",
  "Quantum Systems",
  "Skyline Digital",
  "FusionWorks",
  "DataCore Technologies",
  "NovaSphere",
  "CyberEdge Solutions",
  "RapidTech",
];

const admins = [
  "John Smith",
  "David Wilson",
  "Sarah Johnson",
  "Michael Brown",
  "Emily Davis",
  "Robert Miller",
  "Jessica Wilson",
  "Daniel Moore",
  "Olivia Taylor",
  "James Anderson",
  "Sophia Thomas",
  "William Jackson",
  "Emma White",
  "Alexander Harris",
  "Isabella Martin",
];

const plans = ["Basic", "Pro", "Enterprise"] as const;

const countries = [
  "India",
  "United States",
  "United Kingdom",
  "Australia",
  "Singapore",
];

export const tenants: Tenant[] = Array.from({ length: 125 }, (_, index) => {
  const tenantNumber = index + 1;

  // First 112 are active, last 13 are inactive
  const status = tenantNumber <= 112 ? "Active" : "Inactive";

  const company = companies[index % companies.length];
  const admin = admins[index % admins.length];
  const plan = plans[index % plans.length];
  const country = countries[index % countries.length];

  return {
    id: String(tenantNumber),

    name:
      tenantNumber <= companies.length
        ? company
        : `${company} ${Math.ceil(tenantNumber / companies.length)}`,

    tenantName:
      tenantNumber <= companies.length
        ? company
        : `${company} ${Math.ceil(tenantNumber / companies.length)}`,

    code: `${company
      .replace(/[^A-Za-z]/g, "")
      .substring(0, 3)
      .toUpperCase()}${String(tenantNumber).padStart(3, "0")}`,

    tenantCode: `${company
      .replace(/[^A-Za-z]/g, "")
      .substring(0, 3)
      .toUpperCase()}${String(tenantNumber).padStart(3, "0")}`,

    adminName: admin,

    adminEmail: `${admin.toLowerCase().replace(/\s+/g, ".")}@example.com`,

    phone: `+91 98765 ${String(10000 + tenantNumber).slice(-5)}`,

    plan,

    subscription: plan,

    users:
      plan === "Enterprise"
        ? 150 + ((tenantNumber * 17) % 250)
        : plan === "Pro"
          ? 80 + ((tenantNumber * 11) % 120)
          : 25 + ((tenantNumber * 7) % 70),

    status,

    country,

    timezone:
      country === "India"
        ? "Asia/Kolkata"
        : country === "United States"
          ? "America/New_York"
          : country === "United Kingdom"
            ? "Europe/London"
            : country === "Australia"
              ? "Australia/Sydney"
              : "Asia/Singapore",

    timeZone:
      country === "India"
        ? "Asia/Kolkata"
        : country === "United States"
          ? "America/New_York"
          : country === "United Kingdom"
            ? "Europe/London"
            : country === "Australia"
              ? "Australia/Sydney"
              : "Asia/Singapore",

    createdAt: `2026-08-${String((tenantNumber % 28) + 1).padStart(2, "0")}`,

    organizations: 2 + (tenantNumber % 10),

    activeUsers:
      status === "Active"
        ? Math.floor(
            (plan === "Enterprise"
              ? 150 + ((tenantNumber * 17) % 250)
              : plan === "Pro"
                ? 80 + ((tenantNumber * 11) % 120)
                : 25 + ((tenantNumber * 7) % 70)) * 0.85,
          )
        : 0,

    storage: 20 + (tenantNumber % 60),
  };
});
