"use client";

import { GameType } from "@/@types/gametype";
import TabSkeleton from "@/components/skeletons/tabSekeleton";
import { Input } from "@/components/ui/input";
import Tabs from "@/components/ui/custom_tabs";
import { fetchGameType } from "@/services/gameTypeServices";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";

interface TabsLayoutProps {
  children: React.ReactNode;
  searchValue?: string;
  onChangeInput?: (v: string) => void;
}

const staticTabs = [
  {
    label: "All",
    route: "/",
  },
  {
    label: "Hot games",
    route: "/hot-games",
  },
];

const TabsLayout = ({
  children,
  searchValue = "",
  onChangeInput,
}: TabsLayoutProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["GET_GAME_TYPES"],
    queryFn: fetchGameType,
  });

  const dynamicTabs = data?.map((gameType: GameType) => ({
    label: gameType.name,
    route: `/game-type/${gameType.id}`,
  }));

  const tabs = [...staticTabs, ...(dynamicTabs || [])];

  return (
    <div className="h-full w-full space-y-2">
      <div className="flex flex-row justify-between items-center px-3">
        <div className="hidden md:block">
          {isLoading ? (
            <TabSkeleton />
          ) : (
            <Tabs tabs={tabs} initialActiveIndex={0} />
          )}
        </div>
        <div>
          <div className="flex flex-row space-x-2 items-center border border-input px-5 rounded-full bg-secondary ">
            <SearchIcon className="h-4 w-4" />
            <Input
              placeholder="Search"
              className="appearance-none bg-secondary"
              value={searchValue}
              onChange={(e) => onChangeInput?.(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default TabsLayout;
