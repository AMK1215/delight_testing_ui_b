import { TransactionHistory } from "@/@types/transaction-history";
import { ApiConfig } from "@/configs/apiConfig";
import { apiService } from "@/utils/apiService";
import get from "lodash/get";

const depositWallet = async ({
  agent_payment_type_id,
  reference_number,
  amount,
}: {
  agent_payment_type_id: number;
  reference_number: string;
  amount: number;
}) => {
  try {
    const { data } = await apiService.post(
      `${ApiConfig.baseUrl}/${ApiConfig.deposit}`,
      {
        agent_payment_type_id: agent_payment_type_id,
        refrence_no: reference_number,
        amount: amount,
      }
    );

    return data as {
      agent_payment_type_id: number;
      user_id: number;
      agent_id: number;
      amount: string;
      refrence_no: string;
      updated_at: string;
      created_at: string;
      id: number;
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

const withdrawWallet = async ({
  payment_type_id,
  account_name,
  account_number,
  amount,
}: {
  payment_type_id: number;
  account_name: string;
  account_number: string;
  amount: number;
}) => {
  try {
    const { data } = await apiService.post(
      `${ApiConfig.baseUrl}/${ApiConfig.withdraw}`,
      {
        payment_type_id,
        account_name,
        account_number,
        amount,
      }
    );

    return data as {
      payment_type_id: number;
      user_id: number;
      agent_id: number;
      amount: string;
      updated_at: string;
      created_at: string;
      id: number;
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

const fetchDepositHistory = async () => {
  try {
    const { data } = await apiService.get(
      `${ApiConfig.baseUrl}/${ApiConfig.depositHistory}`
    );

    return data.data as TransactionHistory[];
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.message")}`);
  }
};

const fetchWithdrawHistory = async () => {
  try {
    const { data } = await apiService.get(
      `${ApiConfig.baseUrl}/${ApiConfig.withdrawHistory}`
    );

    return data.data as TransactionHistory[];
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.message")}`);
  }
};

export {
  depositWallet,
  withdrawWallet,
  fetchDepositHistory,
  fetchWithdrawHistory,
};
