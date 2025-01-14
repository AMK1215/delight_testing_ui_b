"use client";

import { useQuery } from "@tanstack/react-query";
import TransactionMobileView from "./TransactionMobileView";
import TransactionTable from "./TransactionTable";
import { fetchWithdrawHistory } from "@/services/walletService";

const DepositHistoryView = () => {
  const { data } = useQuery({
    queryKey: ["GET_WITHDRAW_HISTORY"],
    queryFn: fetchWithdrawHistory,
  });
  return (
    <div>
      <div className="hidden md:block">
        <TransactionTable data={data ?? []} type="withdraw" />
      </div>
      <div className="block md:hidden">
        <TransactionMobileView data={data ?? []} type="withdraw" />
      </div>
    </div>
  );
};

export default DepositHistoryView;
