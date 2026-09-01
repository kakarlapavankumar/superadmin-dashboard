import type { Tenant } from "../types/tenant";

export const tenants: Tenant[] = [
  {
    id: "1",
    tenantCode: "ACM001",
    tenantName: "Acme Corp",

    adminName: "Pavan Kumar",
    adminEmail: "pavan@acme.com",

    phone: "+91 9876543210",

    subscription: "Enterprise",

    country: "India",
    timeZone: "Asia/Kolkata",

    status: "Active",

    users: 250,
    organizations: 8,
    activeUsers: 218,

    storage: 64,

    createdAt: "2026-08-01",
  },

  {
    id: "2",
    tenantCode: "TEC002",
    tenantName: "TechNova",

    adminName: "David Wilson",
    adminEmail: "david@technova.com",

    phone: "+91 9876543211",

    subscription: "Pro",

    country: "India",
    timeZone: "Asia/Kolkata",

    status: "Active",

    users: 120,
    organizations: 5,
    activeUsers: 104,

    storage: 48,

    createdAt: "2026-08-05",
  },

  {
    id: "3",
    tenantCode: "ALP003",
    tenantName: "Alpha Ltd",

    adminName: "Sarah Williams",
    adminEmail: "sarah@alpha.com",

    phone: "+91 9876543212",

    subscription: "Basic",

    country: "India",
    timeZone: "Asia/Kolkata",

    status: "Inactive",

    users: 45,
    organizations: 2,
    activeUsers: 0,

    storage: 31,

    createdAt: "2026-08-10",
  },

  {
    id: "4",
    tenantCode: "GLO004",
    tenantName: "Global Solutions",

    adminName: "John Smith",
    adminEmail: "john@globalsolutions.com",

    phone: "+91 9876543213",

    subscription: "Enterprise",

    country: "India",
    timeZone: "Asia/Kolkata",

    status: "Active",

    users: 380,
    organizations: 14,
    activeUsers: 342,

    storage: 92,

    createdAt: "2026-07-20",
  },

  {
    id: "5",
    tenantCode: "NOV005",
    tenantName: "Nova Technologies",

    adminName: "Priya Sharma",
    adminEmail: "priya@novatech.com",

    phone: "+91 9876543214",

    subscription: "Pro",

    country: "India",
    timeZone: "Asia/Kolkata",

    status: "Active",

    users: 175,
    organizations: 7,
    activeUsers: 151,

    storage: 55,

    createdAt: "2026-07-25",
  },
];
