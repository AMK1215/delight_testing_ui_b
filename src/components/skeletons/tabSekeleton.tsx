import { Skeleton } from "@/components/ui/skeleton";

const TabSkeleton = () => {
  return (
    <div className="flex flex-row space-x-3 items-center">
      <Skeleton className="rounded-full w-[40px] h-[20px]" />
      <Skeleton className="rounded-full w-[40px] h-[20px]" />
      <Skeleton className="rounded-full w-[40px] h-[20px]" />
      <Skeleton className="rounded-full w-[40px] h-[20px]" />
    </div>
  );
};

export default TabSkeleton;
