import { Skeleton } from "@/components/ui/skeleton";

const TabSkeleton = () => {
  return (
    <div className="flex flex-row space-x-3 items-center">
      <Skeleton className="rounded-full w-[40px] h-[20px] bg-secondary" />
      <Skeleton className="rounded-full w-[40px] h-[20px] bg-secondary" />
      <Skeleton className="rounded-full w-[40px] h-[20px] bg-secondary" />
      <Skeleton className="rounded-full w-[40px] h-[20px] bg-secondary" />
    </div>
  );
};

export default TabSkeleton;
