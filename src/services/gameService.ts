import { Game } from "@/@types/game";
import { GameProduct } from "@/@types/game-product";
import { PlayHistory } from "@/@types/play-history";
import { ApiConfig } from "@/configs/apiConfig";
import { apiService } from "@/utils/apiService";

const fetchAllGamesByProviderAndType = async ({
  game_type_id,
  provider_id,
}: {
  provider_id: number;
  game_type_id: number;
}) => {
  try {
    const { data } = await apiService.get(
      `${ApiConfig.baseUrl}/${ApiConfig.gameList}/${provider_id}/${game_type_id}`
    );

    return data.data as Game[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchGameProductsByGameType = async (game_type_id: number) => {
  try {
    const { data } = await apiService.get(
      `${ApiConfig.baseUrl}/${ApiConfig.gameProduct}/${game_type_id}`
    );

    return data.data as GameProduct;
  } catch (error) {
    console.error(error);
    throw new Error(`Fail to fetch game product : ${error}`);
  }
};

const fetchGamePlayHistory = async (
  type: "this_week" | "today" | "yesterday" | "last_week"
) => {
  try {
    const { data } = await apiService.get(
      `${ApiConfig.baseUrl}/${ApiConfig.gameLogs}?type=${type}`
    );

    return data.data as PlayHistory[];
  } catch (error) {
    console.error(error);
    throw new Error(`Fail to fetch game product : ${error}`);
  }
};

const fetchHotGames = async () => {
  try {
    const { data } = await apiService.get(
      `${ApiConfig.baseUrl}/${ApiConfig.hotGames}`
    );

    return data.data as Game[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  fetchAllGamesByProviderAndType,
  fetchGameProductsByGameType,
  fetchGamePlayHistory,
  fetchHotGames,
};
