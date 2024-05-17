"use server";
const STRAPI_URL = process.env.STRAPI_URL;
import { cookies } from "next/headers";

export type State = {
  errors?: {
    customerId?: string[];
    name?: string[];
    email?: string[];
  };
  message?: string | null;
};

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const CustomerSchema = z.object({
  id: z.string().optional(),
  name: z.string().nonempty({
    message: "Please enter a name.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  image: z.string().optional(), // Assuming the image URL is provided as a string
});

const CreateCustomer = CustomerSchema.omit({ id: true });
export async function createCustomer(prevState: State, formData: FormData) {
  const authToken = cookies().get("jwt")?.value;
  if (!authToken) throw new Error("Not Authorized.");

  const validatedFields = CreateCustomer.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    image: formData.get("image"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Customer.",
    };
  }

  // Prepare data for insertion into the database
  const { name, email, image } = validatedFields.data;

  const dataToSend = {
    data: {
      name,
      email,
      image,
    },
  };

  try {
    const response = await fetch(STRAPI_URL + "/api/customers", {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    });
    const data = await response.json();
    if (!response.ok)
      return { ok: false, error: data.error.message, data: null };
    if (response.ok && data.error)
      return { ok: false, error: data.error.message, data: null };
  } catch (err) {
    return { error: "Database Error: Failed to Create Customer." };
  }
  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
}

const UpdateCustomer = CustomerSchema.omit({});
export async function updateCustomer(formData: FormData) {
  const authToken = cookies().get("jwt")?.value;
  if (!authToken) throw new Error("Not Authorized.");

  const { name, email, image, id } = UpdateCustomer.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    image: formData.get("image"),
    id: formData.get("id"),
  });

  const dataToSend = {
    data: {
      name,
      email,
      image,
    },
  };

  try {
    const response = await fetch(STRAPI_URL + "/api/customers/" + id, {
      method: "PUT",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    });
    const data = await response.json();
    if (!response.ok)
      return { ok: false, error: data.error.message, data: null };
    if (response.ok && data.error)
      return { ok: false, error: data.error.message, data: null };
  } catch (err) {
    return { error: "Database Error: Failed to Update Customer." };
  }
  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
}

export async function deleteCustomer(id: string) {
  const authToken = cookies().get("jwt")?.value;
  if (!authToken) throw new Error("Not Authorized.");

  try {
    const response = await fetch(STRAPI_URL + "/api/customers/" + id, {
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
    return { error: "Database Error: Failed to Delete Customer." };
  }
  revalidatePath("/dashboard/customers");
}
