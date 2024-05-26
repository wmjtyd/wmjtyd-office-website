"use server";
const STRAPI_URL = process.env.STRAPI_URL;
import { cookies } from "next/headers";

export type State = {
  errors?: {
    description?: string[];
    contact?: string[];
    status?: string[];
  };
  message?: string | null;
};

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ReqInquirySchema = z.object({
  id: z.string(),
  description: z.string(),
  contact: z.string(),
  status: z.enum(["submitted", "progress", "completed"], {
    invalid_type_error: "Please select a valid status.",
  }),
  createdtime: z.string(),
});

type ReqInquiryParams = {
  description: string;
  contact: string;
  status: string;
};

const CreateReqInquiry = ReqInquirySchema.omit({ id: true, createdtime: true });
export async function createReqInquiry({ description, contact, status }: ReqInquiryParams) {
  const authToken = cookies().get("jwt")?.value;
  if (!authToken) throw new Error("Not Authorized.");

  const validatedData = CreateReqInquiry.parse({ description, contact, status });
  
  try {
    const response = await fetch(STRAPI_URL + '/api/req-inquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken,
      },
      body: JSON.stringify(validatedData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create inquiry');
    }
    return data;
  } catch (error) {
    console.error('Error creating inquiry:', error);
    if (error instanceof Error) {
        return { errors: { message: error.message } };
    } else {
        return { errors: { message: 'An unknown error occurred' } };
    }
}
}

const UpdateReqInquiry = ReqInquirySchema.omit({ createdtime: true });
export async function updateReqInquiry(formData: FormData) {
  const authToken = cookies().get("jwt")?.value;
  if (!authToken) throw new Error("Not Authorized.");

  const { description, contact, status, id } = UpdateReqInquiry.parse({
    description: formData.get("description"),
    contact: formData.get("contact"),
    status: formData.get("status"),
    id: formData.get("id"),
  });

  const createdtime = new Date().toISOString();

  const dataToSend = {
    data: {
      description,
      contact,
      status,
      createdtime,
    },
  };

  try {
    const response = await fetch(STRAPI_URL + "/api/req-inquiries/" + id, {
      method: "PUT",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    });
    const data = await response.json();
    if (!response.ok) return { ok: false, error: data.error.message, data: null };
    if (response.ok && data.error) return { ok: false, error: data.error.message, data: null };
  } catch (err) {
    return { error: "Database Error: Failed to Update Req Inquiry." };
  }
  revalidatePath("/dashboard/req_inquiry");
  redirect("/dashboard/req_inquiry");
}

export async function deleteReqInquiry(id: string) {
  const authToken = cookies().get("jwt")?.value;
  if (!authToken) throw new Error("Not Authorized.");

  try {
    const response = await fetch(STRAPI_URL + "/api/req-inquiries/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + authToken,
      },
    });
    const data = await response.json();
    if (!response.ok) return { ok: false, error: data.error.message, data: null };
    if (response.ok && data.error) return { ok: false, error: data.error.message, data: null };
  } catch (err) {
    return { error: "Database Error: Failed to Delete Req Inquiry." };
  }
  revalidatePath("/dashboard/req_inquiry");
}
