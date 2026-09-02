import type { User, CreateUserInput, UpdateUserInput } from "../types/user";

import { users } from "../mock/users";

let userData: User[] = [...users];

export interface UserFilters {
  search?: string;
  status?: string;
  role?: string;
  page?: number;
  limit?: number;
}

export const getUsers = async (filters: UserFilters = {}) => {
  const {
    search = "",
    status = "all",
    role = "all",
    page = 1,
    limit = 10,
  } = filters;

  let result = [...userData];

  if (search.trim()) {
    const value = search.toLowerCase().trim();

    result = result.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

      return (
        fullName.includes(value) ||
        user.email.toLowerCase().includes(value) ||
        user.tenantName.toLowerCase().includes(value) ||
        user.organizationName.toLowerCase().includes(value)
      );
    });
  }

  if (status !== "all") {
    result = result.filter((user) => user.status === status);
  }

  if (role !== "all") {
    result = result.filter((user) => user.role === role);
  }

  const total = result.length;

  const totalPages = total === 0 ? 1 : Math.ceil(total / limit);

  const safePage = Math.min(Math.max(page, 1), totalPages);

  const startIndex = (safePage - 1) * limit;

  const data = result.slice(startIndex, startIndex + limit);

  return {
    data,
    total,
    page: safePage,
    limit,
    totalPages,
  };
};

export const getUser = async (id: number): Promise<User | undefined> => {
  return userData.find((user) => user.id === id);
};

export const createUser = async (input: CreateUserInput): Promise<User> => {
  const newId =
    userData.length > 0 ? Math.max(...userData.map((user) => user.id)) + 1 : 1;

  const today = new Date().toISOString().split("T")[0];

  const newUser: User = {
    id: newId,

    firstName: input.firstName,
    lastName: input.lastName,

    email: input.email,
    phone: input.phone,

    role: input.role,
    status: input.status,

    tenantId: input.tenantId,
    tenantName: input.tenantName,

    organizationId: input.organizationId,

    organizationName: input.organizationName,

    lastLogin: null,

    createdAt: today,
    updatedAt: today,
  };

  userData.push(newUser);

  return newUser;
};

export const updateUser = async (
  id: number,
  input: UpdateUserInput,
): Promise<User> => {
  const index = userData.findIndex((user) => user.id === id);

  if (index === -1) {
    throw new Error("User not found");
  }

  const today = new Date().toISOString().split("T")[0];

  const updatedUser: User = {
    ...userData[index],

    firstName: input.firstName,
    lastName: input.lastName,

    email: input.email,
    phone: input.phone,

    role: input.role,
    status: input.status,

    tenantId: input.tenantId,
    tenantName: input.tenantName,

    organizationId: input.organizationId,

    organizationName: input.organizationName,

    updatedAt: today,
  };

  userData[index] = updatedUser;

  return updatedUser;
};

export const activateUser = async (id: number): Promise<User> => {
  return updateUserStatus(id, "Active");
};

export const deactivateUser = async (id: number): Promise<User> => {
  return updateUserStatus(id, "Inactive");
};

const updateUserStatus = async (
  id: number,
  status: "Active" | "Inactive",
): Promise<User> => {
  const index = userData.findIndex((user) => user.id === id);

  if (index === -1) {
    throw new Error("User not found");
  }

  const today = new Date().toISOString().split("T")[0];

  userData[index] = {
    ...userData[index],
    status,
    updatedAt: today,
  };

  return userData[index];
};

export const deleteUser = async (id: number): Promise<void> => {
  const exists = userData.some((user) => user.id === id);

  if (!exists) {
    throw new Error("User not found");
  }

  userData = userData.filter((user) => user.id !== id);
};
