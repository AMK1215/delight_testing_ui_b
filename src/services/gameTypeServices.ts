import { GameType } from "@/@types/gametype";
import { ApiConfig } from "@/configs/apiConfig";
import { apiService } from "@/utils/apiService";

const fetchGameType = async () => {
  try {
    const { data } = await apiService.get(
      `${ApiConfig.baseUrl}/${ApiConfig.gameType}`
    );
    return data.data as GameType[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { fetchGameType };
