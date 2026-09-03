import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getPlatformConfig,
  updatePlatformConfig,
} from "../api/platformConfigApi";

import type { PlatformConfig } from "../types/platformConfig";

export function usePlatformConfig() {
  return useQuery({
    queryKey: ["platformConfig"],
    queryFn: getPlatformConfig,
  });
}

export function useUpdatePlatformConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PlatformConfig) => updatePlatformConfig(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["platformConfig"],
      });
    },
  });
}
