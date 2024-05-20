import { UpdateReqInquiry, DeleteReqInquiry } from "@/app/ui/req_inquiry/buttons";
import ReqInquiryStatus from "@/app/ui/req_inquiry/status";
import { formatDateToLocal } from "@/app/lib/utils";

export default async function ReqInquiriesTable({
  reqInquiries,
}: {
  currentPage: number;
  reqInquiries: object[];
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="min-w-full text-gray-900">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Description
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Contact
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created Time
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {reqInquiries?.map((reqInquiry: any) => (
                <tr
                  key={reqInquiry.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{reqInquiry.description}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {reqInquiry.contact}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(reqInquiry.createdtime)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <ReqInquiryStatus status={reqInquiry.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateReqInquiry id={reqInquiry.id} />
                      <DeleteReqInquiry id={reqInquiry.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
