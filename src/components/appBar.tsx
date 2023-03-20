import SearchBar from "@components/searchBar";
import { memo } from "react";

interface AppBarProps {
  onSearch: (searchTerm: string) => void;
  onPlatformChange: (platform: string) => void;
}
function AppBar({ onSearch, onPlatformChange }: AppBarProps) {
  return (
    <header className="bg-slate-500 shadow-sm lg:static lg:overflow-y-visible h-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex space-x-8 justify-between lg:gap-8 xl:grid xl:grid-cols-12">
          <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="block h-8 w-auto"
                src="https://cdn.battlefy.com/helix/images/logos/logo-battlefy-white.svg"
                alt="Your Company"
              />
            </div>
          </div>
          <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-10">
            <SearchBar
              onSearch={onSearch}
              onPlatformChange={onPlatformChange}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default memo(AppBar);
