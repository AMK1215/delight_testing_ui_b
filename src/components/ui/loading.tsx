import { LucideLoader2 } from "lucide-react";
import React from "react";

interface LoadingProps {
  children?: React.ReactNode;
  loading: boolean;
}

const Loading = ({ children, loading }: LoadingProps) => {
  return (
    <div className="flex items-center justify-center">
      {loading ? (
        <div className="flex flex-col items-center">
          <LucideLoader2 className="h-4 w-5 animate-spin" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Loading;
