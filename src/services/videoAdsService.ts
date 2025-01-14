import { VideoAds } from "@/@types/video-ads";
import { ApiConfig } from "@/configs/apiConfig";
import { apiService } from "@/utils/apiService";
import get from "lodash/get";

const fetchVideoAds = async () => {
  try {
    const { data } = await apiService.get(
      `${ApiConfig.baseUrl}/${ApiConfig.videoAds}`
    );
    return data.data as VideoAds[];
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.message")}`);
  }
};

export { fetchVideoAds };
