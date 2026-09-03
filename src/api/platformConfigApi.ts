import type { PlatformConfig } from "../types/platformConfig";
import { platformConfig } from "../mock/platformConfig";

let config = { ...platformConfig };

export const getPlatformConfig = async (): Promise<PlatformConfig> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { ...config };
};

export const updatePlatformConfig = async (
  data: PlatformConfig,
): Promise<PlatformConfig> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  config = { ...data };

  return { ...config };
};
