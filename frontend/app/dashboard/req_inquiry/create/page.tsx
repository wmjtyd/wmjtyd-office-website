import Form from "@/app/ui/req_inquiry/create-form";
import Breadcrumbs from "@/app/ui/req_inquiry/breadcrumbs";

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Req Inquiries", href: "/dashboard/req_inquiry" },
          {
            label: "Create Req Inquiry",
            href: "/dashboard/req_inquiry/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}

