import { Skeleton } from "@/components/ui/skeleton"

const TopTabSkeleton = () => {
    return <div className="flex flex-row space-x-5">
        <Skeleton className="p-2 w-[30px] rounded-full"/>
        <Skeleton className="p-2 w-[30px] rounded-full"/>
        <Skeleton className="p-2 w-[30px] rounded-full"/>
        <Skeleton className="p-2 w-[30px] rounded-full"/>
    </div>
}

export default TopTabSkeleton;