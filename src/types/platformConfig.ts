export interface PlatformConfig {
  platformName: string;
  platformUrl: string;
  supportEmail: string;
  timezone: string;

  defaultLanguage: string;
  currency: string;
  dateFormat: string;

  smtpHost: string;
  smtpPort: number;
  senderEmail: string;

  storageProvider: string;
  storageRegion: string;
  storageBucket: string;

  maintenanceMode: boolean;
  allowRegistration: boolean;
  emailVerification: boolean;
  mfaRequired: boolean;

  sessionTimeout: number;
}
