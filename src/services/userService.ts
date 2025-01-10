import { User } from "@/@types/user";
import { ApiConfig } from "@/configs/apiConfig";
import { apiService } from "@/utils/apiService";
import get from "lodash/get";

const getMe = async () => {
  try {
    const { data } = await apiService.get(
      `${ApiConfig.baseUrl}/${ApiConfig.user}`
    );
    return data.data as User;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const signIn = async ({
  user_name,
  password,
}: {
  user_name: string;
  password: string;
}) => {
  try {
    const { data } = await apiService.post(
      `${ApiConfig.baseUrl}/${ApiConfig.login}`,
      {
        user_name,
        password,
      }
    );
    return {
      user: get(data.data, "user", {}) as User,
      token: get(data.data, "token", "") as string,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const logOut = async () => {
  try {
    await apiService.post(`${ApiConfig.baseUrl}/${ApiConfig.logout}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getMe, signIn, logOut };
