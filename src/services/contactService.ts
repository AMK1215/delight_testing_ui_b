import { Contact } from "@/@types/contact";
import { ApiConfig } from "@/configs/apiConfig";
import { apiService } from "@/utils/apiService";

const fetchContractInformation = async () => {
  try {
    const { data } = await apiService.get(
      `${ApiConfig.baseUrl}/${ApiConfig.contact}`
    );

    return data.data as Contact[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { fetchContractInformation };
