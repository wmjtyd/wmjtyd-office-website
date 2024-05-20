import { fetchFilteredReqInquiries } from "@/app/lib/data-req_inquiry";
import Pagination from "@/app/ui/req_inquiry/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/req_inquiry/table";
import { CreateReqInquiry } from "@/app/ui/req_inquiry/buttons";
import { lusitana } from "@/app/ui/fonts";
import { ReqInquiriesTableSkeleton } from "@/app/ui/dashboard/skeletons";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const { data: reqInquiries , meta } = await fetchFilteredReqInquiries(query, currentPage);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Req Inquiries</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search req inquiries..." />
        <CreateReqInquiry />
      </div>
      <Suspense key={query + currentPage} fallback={<ReqInquiriesTableSkeleton />}>
        <Table reqInquiries={reqInquiries} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {<Pagination totalPages={meta.pagination.pageCount} />}
      </div>
    </div>
  );
}
