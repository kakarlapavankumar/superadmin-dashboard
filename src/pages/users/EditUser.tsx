import { useState, type FormEvent } from "react";

import { ArrowLeft, Save } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { useUser, useUpdateUser } from "../../hooks/useUsers";

import type { UserFormData } from "../../types/user";

const EditUser = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const userQuery = useUser(id);

  const updateUser = useUpdateUser();

  const user = userQuery.data;

  const [form, setForm] = useState<UserFormData | null>(null);

  if (userQuery.isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-sm text-slate-500">
        Loading user...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <h2 className="font-semibold text-slate-900">User not found</h2>

        <button
          type="button"
          onClick={() => navigate("/users")}
          className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm text-white"
        >
          Back to Users
        </button>
      </div>
    );
  }

  const defaultForm: UserFormData = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    status: user.status,
    tenantId: user.tenantId,
    tenantName: user.tenantName,
    organizationId: user.organizationId,
    organizationName: user.organizationName,
  };

  const formData = form ?? defaultForm;

  const handleChange = (field: keyof UserFormData, value: string | number) => {
    setForm((previous) => ({
      ...(previous ?? defaultForm),
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.firstName.trim()) {
      alert("First name is required.");
      return;
    }

    if (!formData.lastName.trim()) {
      alert("Last name is required.");
      return;
    }

    if (!formData.email.trim()) {
      alert("Email is required.");
      return;
    }

    try {
      await updateUser.mutateAsync({
        id: Number(id),
        data: formData,
      });

      navigate(`/users/${id}`);
    } catch (error) {
      console.error(error);

      alert("Failed to update user.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(`/users/${id}`)}
          className="rounded-lg border border-slate-200 bg-white p-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit User</h1>

          <p className="text-sm text-slate-500">Update user information.</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white"
      >
        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">First Name</label>

            <input
              value={formData.firstName}
              onChange={(event) =>
                handleChange("firstName", event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Last Name</label>

            <input
              value={formData.lastName}
              onChange={(event) => handleChange("lastName", event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>

            <input
              type="email"
              value={formData.email}
              onChange={(event) => handleChange("email", event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Phone</label>

            <input
              value={formData.phone}
              onChange={(event) => handleChange("phone", event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Role</label>

            <select
              value={formData.role}
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
            <label className="mb-2 block text-sm font-medium">Status</label>

            <select
              value={formData.status}
              onChange={(event) => handleChange("status", event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm"
            >
              <option value="Active">Active</option>

              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Tenant Name
            </label>

            <input
              value={formData.tenantName}
              onChange={(event) =>
                handleChange("tenantName", event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Organization Name
            </label>

            <input
              value={formData.organizationName}
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
            onClick={() => navigate(`/users/${id}`)}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={updateUser.isPending}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm text-white disabled:opacity-50"
          >
            <Save className="h-4 w-4" />

            {updateUser.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
