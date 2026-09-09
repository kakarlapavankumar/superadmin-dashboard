import { Link } from "react-router-dom";

import BackToDashboard from "../../components/BackToDashboard";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";

import { usePaymentHistory } from "../../hooks/useBilling";

import type { PaymentStatus } from "../../types/billing";

const statusClasses: Record<PaymentStatus, string> = {
  successful: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
  refunded: "bg-yellow-100 text-yellow-700",
};

export default function PaymentHistory() {
  const paymentsQuery = usePaymentHistory();

  if (paymentsQuery.isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (paymentsQuery.isError) {
    return (
      <div className="p-6">
        <ErrorMessage message="Unable to load payment history." />
      </div>
    );
  }

  const payments = paymentsQuery.data ?? [];

  return (
    <div className="space-y-6 p-6">
      <BackToDashboard />

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>

          <p className="mt-1 text-sm text-gray-500">
            Review all billing transactions.
          </p>
        </div>

        <Link
          to="/billing"
          className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back to Billing
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {payments.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-500">
            No payment records found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1000px] w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-xs font-semibold uppercase text-gray-500">
                  <th className="px-5 py-3">Transaction</th>

                  <th className="px-5 py-3">Invoice</th>

                  <th className="px-5 py-3">Tenant</th>

                  <th className="px-5 py-3">Amount</th>

                  <th className="px-5 py-3">Status</th>

                  <th className="px-5 py-3">Payment Method</th>

                  <th className="px-5 py-3">Date</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 text-sm font-medium text-gray-900">
                      {payment.transactionId}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {payment.invoiceNumber}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-900">
                      {payment.tenantName}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-gray-900">
                      {payment.currency} {payment.amount.toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[payment.status]}`}
                      >
                        {payment.status.charAt(0).toUpperCase() +
                          payment.status.slice(1)}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {payment.paymentMethod}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {new Date(payment.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
