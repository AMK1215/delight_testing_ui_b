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
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.message")}`);
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
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.message")}`);
  }
};

const logOut = async () => {
  try {
    await apiService.post(`${ApiConfig.baseUrl}/${ApiConfig.logout}`);
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.message")}`);
  }
};

const signUp = async ({
  name,
  password,
  phone,
  password_confirmation,
  referral_code,
}: {
  name: string;
  password: string;
  phone: string;
  password_confirmation: string;
  referral_code: string;
}) => {
  try {
    const { data } = await apiService.post(
      `${ApiConfig.baseUrl}/${ApiConfig.register}`,
      {
        name,
        password,
        phone,
        password_confirmation,
        referral_code,
      }
    );

    return {
      user: data.data.user as User,
      token: data.data.token as string,
    };
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.message")}`);
  }
};
export { getMe, signIn, logOut, signUp };
