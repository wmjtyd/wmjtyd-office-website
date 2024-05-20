import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function ReqInquiryStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'submitted',
          'bg-green-500 text-white': status === 'progress',
          'bg-blue-500 text-white': status === 'completed',
        },
      )}
    >
      {status === 'submitted' ? (
        <>
          Submitted
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'progress' ? (
        <>
          In Progress
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'completed' ? (
        <>
          Completed
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
