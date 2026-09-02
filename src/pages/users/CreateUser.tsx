import { useState, type FormEvent } from "react";

import { ArrowLeft, Save, UserPlus } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useCreateUser } from "../../hooks/useUsers";

import type { CreateUserInput } from "../../types/user";

const initialForm: CreateUserInput = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "User",
  status: "Active",
  tenantId: 1,
  tenantName: "OneCloud",
  organizationId: "ORG001",
  organizationName: "OneCloud Technologies",
};

const CreateUser = () => {
  const navigate = useNavigate();

  const createUser = useCreateUser();

  const [form, setForm] = useState<CreateUserInput>(initialForm);

  const handleChange = (
    field: keyof CreateUserInput,
    value: string | number,
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.firstName.trim()) {
      alert("First name is required.");
      return;
    }

    if (!form.lastName.trim()) {
      alert("Last name is required.");
      return;
    }

    if (!form.email.trim()) {
      alert("Email is required.");
      return;
    }

    if (!form.phone.trim()) {
      alert("Phone is required.");
      return;
    }

    try {
      await createUser.mutateAsync(form);

      navigate("/users");
    } catch (error) {
      console.error(error);

      alert("Failed to create user.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/users")}
          className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">Create User</h1>

          <p className="mt-1 text-sm text-slate-500">
            Add a new platform user.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-slate-100 p-2">
              <UserPlus className="h-5 w-5 text-slate-700" />
            </div>

            <h2 className="font-semibold text-slate-900">User Information</h2>
          </div>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              First Name
            </label>

            <input
              value={form.firstName}
              onChange={(event) =>
                handleChange("firstName", event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
              placeholder="First name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Last Name
            </label>

            <input
              value={form.lastName}
              onChange={(event) => handleChange("lastName", event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
              placeholder="Last name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={form.email}
              onChange={(event) => handleChange("email", event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
              placeholder="user@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Phone
            </label>

            <input
              value={form.phone}
              onChange={(event) => handleChange("phone", event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
              placeholder="+91 9876543210"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Role
            </label>

            <select
              value={form.role}
              onChange={(event) => handleChange("role", event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm"
            >
              <option value="Super Admin">Super Admin</option>

              <option value="Admin">Admin</option>

              <option value="Manager">Manager</option>

              <option value="User">User</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              value={form.status}
              onChange={(event) => handleChange("status", event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm"
            >
              <option value="Active">Active</option>

              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Tenant ID
            </label>

            <input
              type="number"
              value={form.tenantId}
              onChange={(event) =>
                handleChange("tenantId", Number(event.target.value))
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Tenant Name
            </label>

            <input
              value={form.tenantName}
              onChange={(event) =>
                handleChange("tenantName", event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Organization ID
            </label>

            <input
              value={form.organizationId}
              onChange={(event) =>
                handleChange("organizationId", event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Organization Name
            </label>

            <input
              value={form.organizationName}
              onChange={(event) =>
                handleChange("organizationName", event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-5">
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={createUser.isPending}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            <Save className="h-4 w-4" />

            {createUser.isPending ? "Creating..." : "Create User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
