"use client";

import { fetchHotGames } from "@/services/gameService";
import { useQuery } from "@tanstack/react-query";
import GameListSkeleton from "./components/GameListSkeleton";

const HotGamesView = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["GET_HOT_GAMES"],
    queryFn: fetchHotGames,
  });

  return (
    <div className="px-5">
      <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full">
        {isLoading ? (
          <GameListSkeleton />
        ) : (
          data?.map((game, idx) => (
            <button
              key={idx}
              className="h-[250px] w-full rounded-md hover:shadow-lg"
            >
              <img
                src={game.image_url}
                className="h-full w-full object-cover rounded-md"
              />
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default HotGamesView;
