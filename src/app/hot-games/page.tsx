"use client";

import GameListSkeleton from "@/components/GameListSkeleton";
import TabsLayout from "@/components/layout/TabsLayout";
import { fetchGameUrl, fetchHotGames } from "@/services/gameService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const HotGamesView = () => {
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["GET_HOT_GAMES"],
    queryFn: fetchHotGames,
  });

  const { mutate: getGameUrl } = useMutation({
    mutationFn: fetchGameUrl,
    onSuccess: (data) => {
      window.open(data.url);
    },
    onError: (error) => {
      toast(error.message, {
        style: {
          backgroundColor: "bg-red-200",
        },
      });
    },
  });

  const filterData =
    data?.filter((g) =>
      g.game_name.toLowerCase().includes(searchValue.toLowerCase())
    ) ?? [];

  const handleStartPlay = (code: string) => {
    getGameUrl(code);
  };

  return (
    <TabsLayout
      searchValue={searchValue}
      onChangeInput={(v) => setSearchValue(v)}
    >
      <div className="px-5">
        <div className="grid gap-5 gap-y-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full">
          {isLoading ? (
            <GameListSkeleton />
          ) : (
            filterData?.map((game, idx) => (
              <button
                key={idx}
                className="h-[250px] w-full rounded-md hover:shadow-lg"
                onClick={() => handleStartPlay(game.game_code)}
              >
                <img
                  src={game.image_url}
                  className="h-full w-full object-cover rounded-md"
                />
                <span>{game.game_name}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </TabsLayout>
  );
};

export default HotGamesView;
