import type { Organization } from "../types/organization";

export const organizations: Organization[] = [
  {
    id: "ORG-001",
    name: "OneCloud Technologies",
    code: "ONECLOUD",
    tenant: "OneCloud",
    industry: "Technology",
    location: "Hyderabad",
    email: "admin@onecloud.com",
    phone: "+91 9876543210",
    website: "https://onecloud.com",
    employees: 420,
    description:
      "Enterprise cloud technology organization focused on SaaS and digital transformation.",
    status: "Active",
    createdAt: "2026-01-15",
    updatedAt: "2026-08-20",
  },

  {
    id: "ORG-002",
    name: "Acme Corporation",
    code: "ACME",
    tenant: "Acme",
    industry: "Finance",
    location: "Mumbai",
    email: "admin@acme.com",
    phone: "+91 9876543211",
    website: "https://acme.com",
    employees: 285,
    description:
      "Financial services organization providing enterprise financial solutions.",
    status: "Active",
    createdAt: "2026-02-10",
    updatedAt: "2026-08-18",
  },

  {
    id: "ORG-003",
    name: "Global Retail Solutions",
    code: "GRS",
    tenant: "Global Retail",
    industry: "Retail",
    location: "Bangalore",
    email: "admin@globalretail.com",
    phone: "+91 9876543212",
    website: "https://globalretail.com",
    employees: 190,
    description:
      "Retail technology organization managing stores and online commerce operations.",
    status: "Inactive",
    createdAt: "2026-03-05",
    updatedAt: "2026-07-30",
  },

  {
    id: "ORG-004",
    name: "Cloud Matrix Pvt Ltd",
    code: "CLOUDMATRIX",
    tenant: "Cloud Matrix",
    industry: "Software",
    location: "Chennai",
    email: "admin@cloudmatrix.com",
    phone: "+91 9876543213",
    website: "https://cloudmatrix.com",
    employees: 150,
    description:
      "Software company building cloud-native enterprise applications.",
    status: "Active",
    createdAt: "2026-03-22",
    updatedAt: "2026-08-10",
  },

  {
    id: "ORG-005",
    name: "Nova Healthcare",
    code: "NOVA",
    tenant: "Nova",
    industry: "Healthcare",
    location: "Pune",
    email: "admin@novahealth.com",
    phone: "+91 9876543214",
    website: "https://novahealth.com",
    employees: 310,
    description:
      "Healthcare organization providing digital healthcare and medical services.",
    status: "Active",
    createdAt: "2026-04-01",
    updatedAt: "2026-08-15",
  },
];
