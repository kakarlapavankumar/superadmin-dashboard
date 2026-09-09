import type { Invoice, InvoiceStatus } from "../../types/billing";

interface InvoiceRowProps {
  invoice: Invoice;
}

const statusClasses: Record<InvoiceStatus, string> = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  overdue: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-700",
};

export default function InvoiceRow({ invoice }: InvoiceRowProps) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-5 py-4">
        <p className="font-medium text-gray-900">{invoice.invoiceNumber}</p>
      </td>

      <td className="px-5 py-4">
        <p className="text-sm text-gray-900">{invoice.tenantName}</p>

        <p className="text-xs text-gray-500">{invoice.tenantId}</p>
      </td>

      <td className="px-5 py-4 text-sm font-medium text-gray-900">
        {invoice.currency} {invoice.amount.toLocaleString()}
      </td>

      <td className="px-5 py-4">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[invoice.status]}`}
        >
          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
        </span>
      </td>

      <td className="px-5 py-4 text-sm text-gray-600">{invoice.issueDate}</td>

      <td className="px-5 py-4 text-sm text-gray-600">{invoice.dueDate}</td>

      <td className="px-5 py-4 text-sm text-gray-600">
        {invoice.paidDate ?? "—"}
      </td>
    </tr>
  );
}
