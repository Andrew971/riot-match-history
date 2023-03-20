import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { riotPlatform } from "lib/constant";

import { memo, useCallback, useRef } from "react";

interface AppBarProps {
  onSearch: (searchTerm: string) => void;
  onPlatformChange: (platform: string) => void;
}
function AppBar({ onSearch, onPlatformChange }: AppBarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onSubmitSearchTerm = useCallback(
    (_e: React.MouseEvent<HTMLButtonElement>) => {
      const inputEl = inputRef.current;
      if (!inputEl) return;
      onSearch && onSearch(inputEl.value);
    },
    [onSearch]
  );
  const onSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onPlatformChange && onPlatformChange(event.target.value);
    },
    [onPlatformChange]
  );
  return (
    <div className="flex space-x-4 items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
      <select
        id="location"
        name="location"
        className="block w-max rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        defaultValue={riotPlatform.BR1.name}
        onChange={onSelectChange}
      >
        {Object.keys(riotPlatform).map((platform) => (
          <option key={platform} value={platform}>
            {platform}
          </option>
        ))}
      </select>
      <div className=" w-full">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            ref={inputRef}
            id="search"
            name="search"
            className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            placeholder="Search"
            type="search"
          />
        </div>
      </div>

      <button
        onClick={onSubmitSearchTerm}
        className="w-max flex items-center rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 justify-center whitespace-nowrap"
      >
        Search
      </button>
    </div>
  );
}

export default memo(AppBar);
