import type { Tenant } from "../types/tenant";

const companyNames = [
  "Acme Corporation",
  "TechNova Solutions",
  "Global Systems",
  "CloudWorks",
  "Bright Technologies",
  "Vertex Innovations",
  "Nexus Digital",
  "BlueSky Enterprises",
  "PrimeSoft Technologies",
  "Apex Solutions",
  "NextGen Systems",
  "InnovaTech",
  "CoreWave Technologies",
  "Skyline Software",
  "Quantum Solutions",
  "Pioneer Technologies",
  "GreenField Systems",
  "SilverLine Technologies",
  "FusionWorks",
  "Orbit Systems",
  "Alpha Technologies",
  "Summit Solutions",
  "Crest Digital",
  "Matrix Technologies",
  "Velocity Systems",
];

const plans: Tenant["plan"][] = ["Basic", "Professional", "Enterprise"];

export const tenants: Tenant[] = Array.from({ length: 125 }, (_, index) => {
  const id = index + 1;
  const companyIndex = index % companyNames.length;

  const name =
    index < 5
      ? companyNames[index]
      : `${companyNames[companyIndex]} ${Math.floor(index / companyNames.length) + 1}`;

  const code = name
    .replace(/[^A-Za-z0-9]/g, "")
    .toUpperCase()
    .slice(0, 12);

  const plan = plans[index % plans.length];

  return {
    id,
    name,
    code: `${code}${id}`,
    domain: `${code.toLowerCase()}${id}.com`,
    status: index % 11 === 0 ? "Inactive" : "Active",
    plan,
    users:
      plan === "Enterprise"
        ? 500 + id * 7
        : plan === "Professional"
          ? 200 + id * 5
          : 50 + id * 3,
    organizations: 1 + (index % 8),
    createdAt: `2026-${String((index % 8) + 1).padStart(2, "0")}-${String(
      (index % 27) + 1,
    ).padStart(2, "0")}`,
    updatedAt: "2026-08-30",
  };
});
