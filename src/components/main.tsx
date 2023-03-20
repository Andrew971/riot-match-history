import { PropsWithChildren, memo } from "react";

function Main({ children }: PropsWithChildren) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 lg:py-8 h-[85vh] overflow-y-auto no-scrollbar">
      {children}
    </div>
  );
}

export default memo(Main);
