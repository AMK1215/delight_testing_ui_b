"use client";

import { useQuery } from "@tanstack/react-query";
import TabsLayout from "../components/layout/TabsLayout";
import HomeLayout from "@/components/layout/HomeLayout";
import { fetchGameProductsByGameType } from "@/services/gameService";
import { fetchGameType } from "@/services/gameTypeServices";
import { useEffect, useState } from "react";
import { GameProduct } from "@/@types/game-product";
import { useRouter } from "next/navigation";
import GameListSkeleton from "@/components/GameListSkeleton";

const HomePage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [gameProducts, setGameProducts] = useState<GameProduct[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const { data: game_types, isLoading: isLoadingGameTypes } = useQuery({
    queryKey: ["GET_GAME_TYPES"],
    queryFn: fetchGameType,
  });

  const filteredGameProducts = gameProducts.map((game) => ({
    ...game,
    products: game.products?.filter((product) =>
      product.provider_name.toLowerCase().includes(searchValue.toLowerCase())
    ),
  }));

  useEffect(() => {
    const fetchGameProducts = async () => {
      if (game_types) {
        const allGameProducts = await Promise.all(
          game_types.map((t) => fetchGameProductsByGameType(t.id))
        );
        setGameProducts(allGameProducts.flat());
        setIsLoading(false);
      }
    };
    fetchGameProducts();
  }, [game_types, isLoadingGameTypes]);

  return (
    <HomeLayout>
      <TabsLayout
        searchValue={searchValue}
        onChangeInput={(v) => setSearchValue(v)}
      >
        <div className="space-y-5 px-5">
          {isLoading || isLoadingGameTypes ? (
            <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full">
              <GameListSkeleton />
            </div>
          ) : (
            filteredGameProducts.map((g, idx) => (
              <div className="space-y-3" key={idx}>
                <div>
                  <div className="inline-flex flex-row space-x-3 bg-black w-auto">
                    <div className="bg-active w-[5px]" />
                    <div className="p-1 pr-3">
                      <span>{g.name}</span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full">
                  {g.products.length > 0 ? (
                    g.products?.map((gp, idx) => (
                      <div
                        key={idx}
                        className="space-y-4 cursor-pointer"
                        onClick={() =>
                          router.push(`game-type/${g.id}?provider=${gp.id}`)
                        }
                      >
                        <div>
                          <img
                            src={gp.imgUrl}
                            alt={gp.provider_name}
                            className="object-cover w-full h-full rounded-md"
                          />
                        </div>
                        <p className="text-sm text-center font-bold">
                          {gp.provider_name}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500">
                      No game available
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        <></>
      </TabsLayout>
    </HomeLayout>
  );
};

export default HomePage;
