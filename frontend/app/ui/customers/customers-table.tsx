import Image from "next/image";
import { UpdateCustomer, DeleteCustomer } from "@/app/ui/customers/buttons";

export default async function CustomersTable({
  customers,
}: {
  currentPage: number;
  customers: {
    id: string;
    name: string;
    email: string;
    image?: {
      url?: string;
    };
  }[];
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {customers?.map((customer: any) => {
              return (
                <div
                  key={customer.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        {customer.image?.url ? (
                          <Image
                            src={"http://localhost:1337" + customer.image.url}
                            className="mr-2 rounded-full"
                            width={28}
                            height={28}
                            alt={`${customer.name}'s profile picture`}
                          />
                        ) : (
                          <div className="mr-2 h-7 w-7 rounded-full bg-gray-200" />
                        )}
                        <p>{customer.name}</p>
                      </div>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div className="flex justify-end gap-2">
                      <UpdateCustomer id={customer.id} />
                      <DeleteCustomer id={customer.id} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {customers?.map((customer: any) => (
                <tr
                  key={customer.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {customer.image?.url ? (
                        <Image
                          src={"http://localhost:1337" + customer.image.url}
                          className="rounded-full"
                          width={28}
                          height={28}
                          alt={`${customer.name}'s profile picture`}
                        />
                      ) : (
                        <div className="h-7 w-7 rounded-full bg-gray-200" />
                      )}
                      <p>{customer.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {customer.email}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateCustomer id={customer.id} />
                      <DeleteCustomer id={customer.id} />
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
