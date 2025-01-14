"use client";

import { getMe } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const UserInfo = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["ME"],
    queryFn: getMe,
  });

  return (
    <Card className="w-full bg-secondary p-4">
      {isLoading ? (
        <Skeleton className="w-full h-9 bg-secondary" />
      ) : (
        <div className="h-full w-full flex flex-col justify-center items-center space-y-2">
          <div className="rounded-full border border-white px-6 py-4 bg-secondary shadow flex items-center justify-center">
            <span className="font-bold text-lg sm:text-xl">
              {user?.name ? user?.name.charAt(0).toUpperCase() : "-"}
            </span>
          </div>
          <span className="text-xl font-bold">{user?.name}</span>
          <div className="bg-primary border border-active px-4 py-1 rounded-md flex flex-row space-x-2 items-center justify-center">
            <img src="/icons/coin.png" className="h-4 w-4" />
            <p className="font-bold">{user?.balance + " MMK"}</p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default UserInfo;
