import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { supportApi } from "../api/supportApi";
import type {
  CreateSupportTicketRequest,
  SupportTicket,
} from "../types/support";

export function useSupportOverview() {
  return useQuery({
    queryKey: ["support", "overview"],
    queryFn: supportApi.getOverview,
  });
}

export function useSupportTickets() {
  return useQuery({
    queryKey: ["support", "tickets"],
    queryFn: supportApi.getTickets,
  });
}

export function useSupportTicket(id?: string) {
  return useQuery({
    queryKey: ["support", "ticket", id],
    queryFn: () => supportApi.getTicket(id!),
    enabled: Boolean(id),
  });
}

export function useCreateSupportTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSupportTicketRequest) =>
      supportApi.createTicket(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["support"],
      });
    },
  });
}

export function useUpdateSupportTicketStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: SupportTicket["status"];
    }) => supportApi.updateTicketStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["support"],
      });
    },
  });
}
