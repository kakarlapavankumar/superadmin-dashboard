export type SupportTicketStatus =
  | "open"
  | "in_progress"
  | "pending"
  | "resolved"
  | "closed";

export type SupportTicketPriority = "low" | "medium" | "high" | "critical";

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  tenantId: string;
  tenantName: string;
  requesterName: string;
  requesterEmail: string;
  category: string;
  priority: SupportTicketPriority;
  status: SupportTicketStatus;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

export interface SupportOverview {
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  pendingTickets: number;
  resolvedTickets: number;
  closedTickets: number;
  criticalTickets: number;
  averageResolutionTime: number;
}

export interface CreateSupportTicketRequest {
  subject: string;
  description: string;
  tenantId: string;
  tenantName: string;
  requesterName: string;
  requesterEmail: string;
  category: string;
  priority: SupportTicketPriority;
}
