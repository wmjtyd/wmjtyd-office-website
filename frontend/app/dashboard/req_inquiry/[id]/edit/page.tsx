import Form from "@/app/ui/req_inquiry/edit-form";
import Breadcrumbs from "@/app/ui/req_inquiry/breadcrumbs";
import { notFound } from "next/navigation";
import { fetchReqInquiries, fetchReqInquiryById } from "@/app/lib/data-req_inquiry";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const reqInquiries = await fetchReqInquiries();
  const reqInquiry = await fetchReqInquiryById(params.id);
  if (!reqInquiry) { notFound() }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Req Inquiries", href: "/dashboard/req_inquiry" },
          {
            label: "Edit Req Inquiry",
            href: `/dashboard/req_inquiry/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form reqInquiry={reqInquiry}/>
    </main>
  );
}
