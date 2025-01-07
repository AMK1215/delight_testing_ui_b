import React from 'react'
import { Skeleton } from '../ui/skeleton'

const GameSkeleton = () => {
    return (
        <div className="flex flex-col items-center space-y-2 ">
            <Skeleton className="bg-zinc-500 h-[90px] w-[90px] rounded-xl" />
            <Skeleton className=" bg-zinc-500 h-[15px] w-[50px] rounded-xl" />
        </div>
    )
}

export default GameSkeleton
