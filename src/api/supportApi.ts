import type {
  CreateSupportTicketRequest,
  SupportTicket,
} from "../types/support";

import { supportOverview, supportTickets } from "../mock/support";

let tickets = [...supportTickets];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const supportApi = {
  async getOverview() {
    await delay(400);

    return supportOverview;
  },

  async getTickets() {
    await delay(500);

    return tickets;
  },

  async getTicket(id: string) {
    await delay(400);

    return tickets.find((ticket) => ticket.id === id) ?? null;
  },

  async createTicket(
    request: CreateSupportTicketRequest,
  ): Promise<SupportTicket> {
    await delay(600);

    const newTicket: SupportTicket = {
      id: String(Date.now()),
      ticketNumber: `SUP-${1000 + tickets.length + 1}`,
      subject: request.subject,
      description: request.description,
      tenantId: request.tenantId,
      tenantName: request.tenantName,
      requesterName: request.requesterName,
      requesterEmail: request.requesterEmail,
      category: request.category,
      priority: request.priority,
      status: "open",
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };

    tickets = [newTicket, ...tickets];

    return newTicket;
  },

  async updateTicketStatus(id: string, status: SupportTicket["status"]) {
    await delay(400);

    tickets = tickets.map((ticket) =>
      ticket.id === id
        ? {
            ...ticket,
            status,
            updatedAt: new Date().toLocaleString(),
            resolvedAt:
              status === "resolved"
                ? new Date().toLocaleString()
                : ticket.resolvedAt,
          }
        : ticket,
    );

    return tickets.find((ticket) => ticket.id === id) ?? null;
  },
};
