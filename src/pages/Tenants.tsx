import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import TenantFilters from "../components/tenants/TenantFilters";
import TenantTable from "../components/tenants/TenantTable";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import Button from "../components/Button";

import {
  useActivateTenant,
  useDeactivateTenant,
  useTenants,
} from "../hooks/useTenants";

export default function Tenants() {
  const { data: tenants = [], isLoading, isError } = useTenants();

  const activateMutation = useActivateTenant();

  const deactivateMutation = useDeactivateTenant();

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [subscription, setSubscription] = useState("");

  const [page, setPage] = useState(1);

  const pageSize = 5;

  const filteredTenants = useMemo(() => {
    return tenants.filter((tenant) => {
      const normalizedSearch = search.toLowerCase();
      const matchesSearch = Object.values(tenant).some((value) =>
        String(value).toLowerCase().includes(normalizedSearch),
      );

      const matchesStatus = !status || tenant.status === status;

      const matchesPlan = !subscription || tenant.subscription === subscription;

      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [tenants, search, status, subscription]);

  const totalPages = Math.max(1, Math.ceil(filteredTenants.length / pageSize));

  const paginatedTenants = filteredTenants.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorMessage message="Unable to load tenants" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tenant Management</h1>

          <p className="text-gray-500">Manage all platform tenants</p>
        </div>

        <Link to="/tenants/create">
          <Button>+ Create Tenant</Button>
        </Link>
      </div>

      <TenantFilters
        search={search}
        status={status}
        subscription={subscription}
        onSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onStatusChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
        onSubscriptionChange={(value) => {
          setSubscription(value);
          setPage(1);
        }}
      />

      <TenantTable
        tenants={paginatedTenants}
        onActivate={(id) => activateMutation.mutate(id)}
        onDeactivate={(id) => deactivateMutation.mutate(id)}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
