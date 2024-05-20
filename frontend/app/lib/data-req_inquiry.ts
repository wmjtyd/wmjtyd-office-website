import { unstable_noStore as noStore } from "next/cache";
import qs from "qs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { flattenAttributes } from "@/app/lib/utils";

const STRAPI_URL = process.env.STRAPI_URL;

export async function fetchFilteredReqInquiries(query: string, currentPage: number) {
  const authToken = cookies().get("jwt")?.value;
  if (!authToken) return redirect("/login");

  noStore();

  const queryObject = qs.stringify({
    sort: ["createdtime:asc"],
    populate: {
      screenshot: {
        fields: ["url"],
      },
    },
    pagination: {
      pageSize: 6,
      page: currentPage,
    },
    filters: {
      $or: [
        {
          status: {
            $contains: query,
          },
        },
        {
          description: {
            $contains: query,
          },
        },
        {
          contact: {
            $contains: query,
          },
        },
      ],
    },
  });

  try {
    const response = await fetch(STRAPI_URL + "/api/req-inquiries?" + queryObject, {
      headers: { Authorization: "Bearer " + authToken },
    });
    const data = await response.json();
    const flattened = flattenAttributes(data.data);
    return { data: flattened, meta: data.meta };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch req inquiries.");
  }
}

export async function fetchReqInquiries() {
  const authToken = cookies().get("jwt")?.value;
  if (!authToken) return redirect("/login");

  const query = qs.stringify({
    populate: {
      fields: ["id", "description", "contact", "createdtime", "status"],
    },
  });

  try {
    const response = await fetch(STRAPI_URL + "/api/req-inquiries?" + query, {
      headers: { Authorization: "Bearer " + authToken },
      cache: "no-store",
    });
    const reqInquiries = await response.json();
    const flatten = flattenAttributes(reqInquiries.data);
    return flatten;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all req inquiries.");
  }
}

export async function fetchReqInquiryById(id: string) {
  const authToken = cookies().get("jwt")?.value;
  if (!authToken) return redirect("/login");

  const query = qs.stringify({
    populate: {
      screenshot: {
        fields: ["url"],
      },
    },
  });

  try {
    const data = await fetch(STRAPI_URL + "/api/req-inquiries/" + id + "?" + query, {
      headers: { Authorization: "Bearer " + authToken },
    });
    const reqInquiry = await data.json();
    const flatten = flattenAttributes(reqInquiry.data);
    return flatten;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch the req inquiry.");
  }
}