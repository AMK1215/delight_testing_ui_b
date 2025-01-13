"use client";

import {
  fetchAllGamesByProviderAndType,
  fetchGameProductsByGameType,
  fetchGameUrl,
} from "@/services/gameService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import TopTabSkeleton from "./components/TopTabSkeleton";
import TabsLayout from "@/components/layout/TabsLayout";
import GameListSkeleton from "@/components/GameListSkeleton";
import { toast } from "sonner";

const GameTypeView = () => {
  const params = useParams();
  const { id } = params;
  const searchParams = useSearchParams();
  const router = useRouter();

  const providerFromUrl = searchParams.get("provider");

  const [tabValue, setTabValue] = useState<number | undefined | null>(
    Number(providerFromUrl)
  );
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["GET_GAMES", id, tabValue],
    queryFn: () =>
      fetchAllGamesByProviderAndType({
        game_type_id: Number(id ?? 0),
        provider_id: Number(tabValue ?? 0),
      }),
    enabled: !!id && !!tabValue,
  });

  const { data: gameProducts, isLoading: isLoadingGameProducts } = useQuery({
    queryKey: ["GET_GAME_PRODUCTS_BY_GAME_TYPE", id],
    queryFn: () => fetchGameProductsByGameType(Number(id ?? 0)),
    enabled: !!id,
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

  const handleTabClick = (providerId: number) => {
    setTabValue(providerId);
    router.replace(`/game-type/${id}?provider=${providerId}`);
  };

  const filterData =
    data?.filter((g) =>
      g.game_name.toLowerCase().includes(searchValue.toLowerCase())
    ) ?? [];

  const handleStartPlay = (code: string) => {
    getGameUrl(code);
  };

  useEffect(() => {
    if (gameProducts && gameProducts.products.length > 0 && !tabValue) {
      const firstProviderId = gameProducts.products[0].id;
      setTabValue(firstProviderId);
      router.replace(`/game-type/${id}?provider=${firstProviderId}`);
    }
  }, [gameProducts, tabValue, id, router]);

  return (
    <TabsLayout
      searchValue={searchValue}
      onChangeInput={(v) => setSearchValue(v)}
    >
      <div className="w-full max-w-[99%] p-4 space-y-4">
        <div className="w-full">
          {isLoadingGameProducts ? (
            <TopTabSkeleton />
          ) : (
            <div className="flex gap-2 sm:gap-4 text-green-400 overflow-x-auto no-scrollbar">
              {gameProducts?.products.map((p, index) => (
                <button
                  key={index}
                  onClick={() => handleTabClick(p.id)}
                  className={`text-sm flex items-center gap-2 px-3 text-nowrap py-2 rounded-lg hover:shadow-lg hover:border hover:border-active ${
                    tabValue === p.id
                      ? "bg-secondary"
                      : "bg-transparent hover:bg-secondary"
                  }`}
                >
                  <span>{p.provider_name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-5 gap-y-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full">
          {isLoading || isFetching ? (
            <GameListSkeleton />
          ) : filterData.length > 0 ? (
            filterData?.map((game, idx) => (
              <button
                key={idx}
                className="h-[250px] w-full rounded-md hover:shadow-lg space-y-5"
                onClick={() => handleStartPlay(game.game_code)}
              >
                <img
                  src={game.image_url}
                  className="h-full w-full object-cover rounded-md"
                />
                <span>{game.game_name}</span>
              </button>
            ))
          ) : (
            <span>No game available</span>
          )}
        </div>
      </div>
    </TabsLayout>
  );
};

export default GameTypeView;
