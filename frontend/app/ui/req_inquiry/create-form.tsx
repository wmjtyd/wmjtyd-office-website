"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createReqInquiry } from "@/app/lib/req_inquiry-actions";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../button";

type State = {
  message: string | null;
  errors: {
    description?: string[];
    contact?: string[];
    status?: string[];
  };
};

export default function Form() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("submitted");
  const [state, setState] = useState<State>({ message: null, errors: {} });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await createReqInquiry({ description, contact, status });
    if (response.errors) {
      setState({ message: null, errors: response.errors });
    } else {
      setState({ message: "Inquiry created successfully", errors: {} });
      router.push("/dashboard/req_inquiry");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Description
          </label>
          <div className="relative">
            <input
              id="description"
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Enter description"
              aria-describedby="description-error"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {state.errors?.description ? (
            <div
              id="description-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.description.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>

        {/* Contact */}
        <div className="mb-4">
          <label htmlFor="contact" className="mb-2 block text-sm font-medium">
            Contact
          </label>
          <div className="relative">
            <input
              id="contact"
              name="contact"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Enter contact"
              aria-describedby="contact-error"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {state.errors?.contact ? (
            <div
              id="contact-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.contact.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="mb-2 block text-sm font-medium">
            Set the inquiry status
          </label>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="submitted"
                  name="status"
                  type="radio"
                  value="submitted"
                  checked={status === "submitted"}
                  onChange={() => setStatus("submitted")}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                />
                <label
                  htmlFor="submitted"
                  className="ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
                >
                  Submitted <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="progress"
                  name="status"
                  type="radio"
                  value="progress"
                  checked={status === "progress"}
                  onChange={() => setStatus("progress")}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                />
                <label
                  htmlFor="progress"
                  className="ml-2 flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white dark:text-gray-300"
                >
                  In Progress <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="completed"
                  name="status"
                  type="radio"
                  value="completed"
                  checked={status === "completed"}
                  onChange={() => setStatus("completed")}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                />
                <label
                  htmlFor="completed"
                  className="ml-2 flex items-center gap-1.5 rounded-full bg-blue-500 px-3 py-1.5 text-xs font-medium text-white dark:text-gray-300"
                >
                  Completed <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          {state.errors?.status ? (
            <div
              id="status-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.status.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/req_inquiry"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Inquiry</Button>
      </div>
    </form>
  );
}
