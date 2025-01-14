"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchGameType } from "@/services/gameTypeServices";
import { GameType } from "@/@types/gametype";
import { FilterIcon } from "lucide-react";

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

const FilterSideMenu = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // Add state for opening the sheet

  const { data } = useQuery({
    queryKey: ["GET_GAME_TYPES"],
    queryFn: fetchGameType,
  });

  const dynamicTabs = data?.map((gameType: GameType) => ({
    label: gameType.name,
    route: `/game-type/${gameType.id}`,
  }));

  const tabs = [...staticTabs, ...(dynamicTabs || [])];

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    router.push(tabs[index].route);
    setIsOpen(false); // Close the sheet after clicking a tab
  };

  useEffect(() => {
    const currentRoute = window.location.pathname;
    const tabIndex = tabs.findIndex((tab) => tab.route === currentRoute);
    if (tabIndex !== -1) {
      setActiveIndex(tabIndex);
    }
  }, [tabs]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {" "}
      {/* Control Sheet state */}
      <SheetTrigger>
        <button
          onClick={() => setIsOpen(true)} // Open the sheet
          className="bg-active p-3 cursor-pointer rounded-full text-secondary absolute bottom-4 right-4"
        >
          <FilterIcon size={14} />
        </button>
      </SheetTrigger>
      <SheetContent className="px-0 py-0">
        <SheetHeader className="relative h-full">
          <SheetTitle className="text-left px-4">
            <p className="text-active mt-3">Filter By</p>
          </SheetTitle>
          <SheetDescription>
            <div className="px-4 mt-5">
              <div className=" mt-5 bg-secondary p-3 rounded-2xl">
                {tabs.map((item, idx) => {
                  return (
                    <div
                      onClick={() => handleTabClick(idx)}
                      key={idx}
                      className={`${
                        activeIndex === idx ? "text-active" : "text-zinc-400"
                      } ${
                        idx === tabs.length - 1 ? "border-b-0" : "border-b-2"
                      } hover:text-active py-3 flex items-center gap-2  border-black cursor-pointer transition-all ease-in-out duration-200`}
                    >
                      <p>{item.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSideMenu;
