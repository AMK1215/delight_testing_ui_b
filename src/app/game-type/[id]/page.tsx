"use client";

import { fetchAllGames } from "@/services/gameService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const GameTypeView = () => {
  const params = useParams();
  const { id } = params;

  const { data } = useQuery({
    queryKey: ["GET_GAMES", id],
    queryFn: () =>
      fetchAllGames({
        game_type: Number(id ?? 0),
      }),
    enabled: !!id,
  });
  return (
    <div className="w-full mx-auto p-4">
      <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full">
        {data?.map((game, idx) => (
          <button key={idx} className="h-[250px] w-full rounded-md hover:shadow-lg">
            <img
              src={game.image_url}
              className="h-full w-full object-cover rounded-md"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameTypeView;
