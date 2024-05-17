import { fetchCustomers } from "@/app/lib/data-customer";
import Pagination from "@/app/ui/customers/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/customers/customers-table";
import { CreateCustomer } from "@/app/ui/customers/buttons";
import { lusitana } from "@/app/ui/fonts";
import { CustomersTableSkeleton } from "@/app/ui/customers/customers-skeletons";
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

  const { data: customers, meta } = await fetchCustomers({ query, page: currentPage });
  console.log('page customers:', customers);
  console.log('page Meta:', meta);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateCustomer />
      </div>
      <Suspense key={query + currentPage} fallback={<CustomersTableSkeleton />}>
        <Table customers={customers} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {<Pagination totalPages={meta.pagination.pageCount} />}
      </div>
    </div>
  );
}
