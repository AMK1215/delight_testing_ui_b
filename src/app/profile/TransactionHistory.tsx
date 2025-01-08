"use client";

import TransactionMobileView from "./TransactionMobileView";
import TransactionTable from "./TransactionTable";

const TransactionHistoryView = () => {
  return (
    <div>
      <div className="hidden md:block">
        <TransactionTable />
      </div>
      <div className="block md:hidden">
        <TransactionMobileView />
      </div>
    </div>
  );
};

export default TransactionHistoryView;
