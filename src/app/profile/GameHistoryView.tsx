import { fetchGamePlayHistory } from "@/services/gameService";
import { useQuery } from "@tanstack/react-query";
import GameHistoryTable from "./GameHistoryTable";
import GameHistoryMobileView from "./GameHistoryMobileView";
import clsx from "clsx";
import { useState } from "react";
import { CheckIcon } from "lucide-react";

interface FilterTab {
  label: string;
  value: string;
}

const filterTabs = [
  {
    label: "Today",
    value: "today",
  },
  { label: "Yesterday", value: "yesterday" },
  { label: "This Week", value: "this_week" },
  { label: "Last Week", value: "last_week" },
] as FilterTab[];

const GameHistoryView = () => {
  const [tabValue, setTabValue] = useState<
    "today" | "this_week" | "last_week" | "yesterday"
  >("today");
  const { data = [] } = useQuery({
    queryKey: ["GET_GAME_PLAY_HISTORY", tabValue],
    queryFn: () => fetchGamePlayHistory(tabValue),
  });
  return (
    <div className="space-y-4">
      <div className="space-x-3 flex flex-row ">
        {filterTabs.map((f, idx) => (
          <button
            key={idx}
            className={clsx(
              "flex flex-row space-x-2 items-center px-2 py-1 rounded-md border hover:border-active",
              {
                "text-active border border-active": tabValue === f.value,
              }
            )}
            onClick={() =>
              setTabValue(
                f.value as "today" | "this_week" | "last_week" | "yesterday"
              )
            }
          >
            <span className="text-sm">{f.label}</span>
            {tabValue === f.value && (
              <CheckIcon className="h-4 w-4 text-active" />
            )}
          </button>
        ))}
      </div>
      <div className="hidden md:block">
        <GameHistoryTable data={data} />
      </div>
      <div className="block md:hidden">
        <GameHistoryMobileView data={data} />
      </div>
    </div>
  );
};

export default GameHistoryView;
