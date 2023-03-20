import { memo } from "react";

interface NoResultStateProps {
  errorMessage?: string;
}
function NoResultState({ errorMessage }: NoResultStateProps) {
  return (
    <div className="grid place-items-center p-2">
      <div className="text-center place-items-center grid border border-gray-400 p-12 rounded-xl border-dashed">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon stroke-gray-800"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="12" cy="12" r="9" />
          <line x1="9" y1="10" x2="9.01" y2="10" />
          <line x1="15" y1="10" x2="15.01" y2="10" />
          <path d="M9.5 15.25a3.5 3.5 0 0 1 5 0" />
        </svg>
        <span className="mt-2 block text-sm font-semibold text-gray-900">
          {errorMessage || "No Player or Match record found"}{" "}
        </span>
        {/* <Typography variant="h3" className=" text-gray-800">
          No Pokemon found
        </Typography> */}
      </div>
    </div>
  );
}

export default memo(NoResultState);
