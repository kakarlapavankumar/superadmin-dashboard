import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { securityApi } from "../api/securityApi";

export const useSecurityOverview = () => {
  return useQuery({
    queryKey: ["security", "overview"],
    queryFn: securityApi.getOverview,
  });
};

export const useSecuritySettings = () => {
  return useQuery({
    queryKey: ["security", "settings"],
    queryFn: securityApi.getSettings,
  });
};

export const useSecurityEvents = () => {
  return useQuery({
    queryKey: ["security", "events"],
    queryFn: securityApi.getEvents,
  });
};

export const useActiveSessions = () => {
  return useQuery({
    queryKey: ["security", "sessions"],
    queryFn: securityApi.getActiveSessions,
  });
};

export const useUpdateSecuritySetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, enabled }: { id: string; enabled: boolean }) =>
      securityApi.updateSetting(id, enabled),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["security", "settings"],
      });
    },
  });
};

export const useResolveSecurityEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: securityApi.resolveEvent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["security", "events"],
      });
    },
  });
};

export const useTerminateSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: securityApi.terminateSession,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["security", "sessions"],
      });
    },
  });
};
