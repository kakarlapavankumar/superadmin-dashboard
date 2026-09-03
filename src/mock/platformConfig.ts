import type { PlatformConfig } from "../types/platformConfig";

export const platformConfig: PlatformConfig = {
  platformName: "OneCloud",
  platformUrl: "https://onecloud.example.com",
  supportEmail: "support@onecloud.com",
  timezone: "Asia/Kolkata",

  defaultLanguage: "English",
  currency: "INR",
  dateFormat: "DD/MM/YYYY",

  smtpHost: "smtp.gmail.com",
  smtpPort: 587,
  senderEmail: "noreply@onecloud.com",

  storageProvider: "AWS S3",
  storageRegion: "ap-south-1",
  storageBucket: "onecloud-production",

  maintenanceMode: false,
  allowRegistration: true,
  emailVerification: true,
  mfaRequired: false,

  sessionTimeout: 30,
};
