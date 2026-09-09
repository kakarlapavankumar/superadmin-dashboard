import { Link } from "react-router-dom";

import BackToDashboard from "../../components/BackToDashboard";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";
import InvoiceRow from "../../components/billing/InvoiceRow";

import { useInvoices } from "../../hooks/useBilling";

export default function Invoices() {
  const invoicesQuery = useInvoices();

  if (invoicesQuery.isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (invoicesQuery.isError) {
    return (
      <div className="p-6">
        <ErrorMessage message="Unable to load invoices." />
      </div>
    );
  }

  const invoices = invoicesQuery.data ?? [];

  return (
    <div className="space-y-6 p-6">
      <BackToDashboard />

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>

          <p className="mt-1 text-sm text-gray-500">
            View and monitor tenant invoices.
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
        {invoices.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-500">
            No invoices found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1000px] w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-xs font-semibold uppercase text-gray-500">
                  <th className="px-5 py-3">Invoice</th>

                  <th className="px-5 py-3">Tenant</th>

                  <th className="px-5 py-3">Amount</th>

                  <th className="px-5 py-3">Status</th>

                  <th className="px-5 py-3">Issue Date</th>

                  <th className="px-5 py-3">Due Date</th>

                  <th className="px-5 py-3">Paid Date</th>
                </tr>
              </thead>

              <tbody>
                {invoices.map((invoice) => (
                  <InvoiceRow key={invoice.id} invoice={invoice} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
