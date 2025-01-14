"use client";

import { useQuery } from "@tanstack/react-query";
import TransactionMobileView from "./TransactionMobileView";
import TransactionTable from "./TransactionTable";
import { fetchDepositHistory } from "@/services/walletService";

const DepositHistoryView = () => {
  const { data } = useQuery({
    queryKey: ["GET_DEPOSIT_HISTORY"],
    queryFn: fetchDepositHistory,
  });
  return (
    <div>
      <div className="hidden md:block">
        <TransactionTable data={data ?? []} type="deposit" />
      </div>
      <div className="block md:hidden">
        <TransactionMobileView data={data ?? []} type="deposit" />
      </div>
    </div>
  );
};

export default DepositHistoryView;
