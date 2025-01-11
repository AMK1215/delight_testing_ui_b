"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PiHandDeposit, PiHandWithdraw } from "react-icons/pi";
import Tabs from "./components/tabs";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import DepositForm from "./DepositForm";
import { useState } from "react";
import WithdrawForm from "./WithdrawForm";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/userService";
import DepositHistoryView from "./DepositHistoryView";
import WithdrawHistoryView from "./WithdrawHistoryView";
import GameHistoryView from "./GameHistoryView";

const tabs = [
  {
    label: "Deposit History",
    content: <DepositHistoryView />,
  },
  {
    label: "Withdraw History",
    content: <WithdrawHistoryView />,
  },
  {
    label: "Game Logs",
    content: <GameHistoryView />,
  },
];

const ProfileView = () => {
  const [dialogState, setDialogState] = useState<
    "deposit" | "withdrawal" | undefined
  >();

  const { data: user } = useQuery({
    queryKey: ["ME"],
    queryFn: getMe,
  });

  const onDialogClose = () => setDialogState(undefined);

  return (
    <div className="p-4 sm:p-6">
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col justify-center items-center space-y-5">
            <div className="rounded-full border border-white px-8 py-7 bg-secondary shadow flex items-center justify-center sm:px-9 sm:py-8">
              <span className="font-bold text-lg sm:text-xl">
                {user?.name ? user?.name.charAt(0).toUpperCase() : "-"}
              </span>
            </div>

            <div className="flex flex-col space-y-3 col-span-2 text-center">
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold sm:text-xl">
                  {user?.name ?? "-"}
                </span>
                <span className="text-sm text-gray-400">
                  {user?.user_name ?? "-"}
                </span>
              </div>
              <span className="text-sm sm:text-md">{user?.phone ?? "-"}</span>
            </div>

            <Card className="bg-secondary w-full max-w-md">
              <CardContent className="px-4 py-4 sm:px-5 sm:py-5">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Your balance </p>
                    <div className="flex flex-row space-x-3 items-center ">
                      <img src="/icons/coin.png" className="h-5 w-5" />
                      <span className="font-semibold text-lg sm:text-2xl">
                        {user?.balance}
                      </span>
                      <p className="text-sm">MMK</p>
                    </div>
                  </div>

                  <div className="flex flex-row space-x-7 justify-center items-center w-full">
                    <Button
                      onClick={() => setDialogState("deposit")}
                      className="w-full sm:w-auto space-x-2 px-4 sm:px-5 border border-active text-active hover:bg-active hover:text-black font-bold"
                    >
                      <PiHandDeposit />
                      Deposit
                    </Button>
                    <Button
                      onClick={() => setDialogState("withdrawal")}
                      className="w-full sm:w-auto px-4 sm:px-5 border border-active text-active hover:bg-active hover:text-black font-bold"
                    >
                      <PiHandWithdraw />
                      Withdraw
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 w-full">
            <Tabs tabs={tabs} />
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={dialogState !== undefined}
        onOpenChange={(isOpen) => !isOpen && setDialogState(undefined)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogState === "deposit" ? "Deposit" : "Withdrawal"}
            </DialogTitle>
          </DialogHeader>
          <div>
            {dialogState === "deposit" ? (
              <DepositForm onDialogClose={onDialogClose} />
            ) : (
              <WithdrawForm onDialogClose={onDialogClose} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileView;
