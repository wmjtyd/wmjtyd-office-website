import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import qs from "qs";
import { flattenAttributes } from "@/app/lib/utils";

const STRAPI_URL = process.env.STRAPI_URL;


export async function fetchCustomer(id: string) {
  const authToken = cookies().get("jwt")?.value;
  if (!authToken) throw new Error("Not Authorized.");

  try {
    const response = await fetch(`${STRAPI_URL}/api/customers/${id}`, {
      headers: { Authorization: "Bearer " + authToken },
      cache: "no-store",
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);
    const customer = flattenAttributes(data.data);
    return customer;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch customer data.");
  }
}

export async function createCustomer(customerData: any) {
  const authToken = cookies().get("jwt")?.value;
  if (!authToken) throw new Error("Not Authorized.");

  try {
    const response = await fetch(`${STRAPI_URL}/api/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
      body: JSON.stringify({ data: customerData }),
    });
    const data = await response.json();
    if (!response.ok) return { ok: false, error: data.error.message, data: null };
    if (response.ok && data.error) return { ok: false, error: data.error.message, data: null };
    const newCustomer = flattenAttributes(data.data);
    return { ok: true, data: newCustomer };
  } catch (err) {
    console.error("Database Error: Failed to create customer.", err);
    return { error: "Database Error: Failed to create customer." };
  }
}

export async function updateCustomer(id: string, customerData: any) {
  const authToken = cookies().get("jwt")?.value;
  if (!authToken) throw new Error("Not Authorized.");

  try {
    const response = await fetch(`${STRAPI_URL}/api/customers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
      body: JSON.stringify({ data: customerData }),
    });
    const data = await response.json();
    if (!response.ok) return { ok: false, error: data.error.message, data: null };
    if (response.ok && data.error) return { ok: false, error: data.error.message, data: null };
    const updatedCustomer = flattenAttributes(data.data);
    return { ok: true, data: updatedCustomer };
  } catch (err) {
    console.error("Database Error: Failed to update customer.", err);
    return { error: "Database Error: Failed to update customer." };
  }
}

export async function deleteCustomer(id: string) {
  const authToken = cookies().get("jwt")?.value;
  if (!authToken) throw new Error("Not Authorized.");

  try {
    const response = await fetch(`${STRAPI_URL}/api/customers/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + authToken,
      },
    });
    const data = await response.json();
    if (!response.ok)
      return { ok: false, error: data.error.message, data: null };
    if (response.ok && data.error)
      return { ok: false, error: data.error.message, data: null };
  } catch (err) {
    return { error: "Database Error: Failed to delete customer." };
  }
}

export async function fetchCustomers({ query = "", page = 1} = {}) {
  const authToken = cookies().get("jwt")?.value;
  if (!authToken) throw new Error("Not Authorized.");

  const pageSize = 10;
  const searchQuery = qs.stringify({
    pagination: {
      page,
      pageSize,
    },
    sort: ["name:asc"],
    filters: {
      name: {
        $containsi: query,
      },
    },
  });

  try {
    const response = await fetch(`${STRAPI_URL}/api/customers?${searchQuery}`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
      cache: "no-store",
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);

    const customers = flattenAttributes(data.data);

    console.log('Fetched customers:', customers);
    console.log('Fetched Pagination meta:', data.meta);

    return {
      data: customers,
      meta: data.meta,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch customers.");
  }
}

