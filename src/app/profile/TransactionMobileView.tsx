import { Histories } from "./data";
import { PiHandDeposit } from "react-icons/pi";
import { PiHandWithdraw } from "react-icons/pi";
import { Accordion, AccordionContent } from "@radix-ui/react-accordion";
import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import clsx from "clsx";

const TransactionMobileView = () => {
  return (
    <div className="space-y-2">
      {Histories.map((history, idx) => (
        <Accordion
          type="single"
          collapsible
          key={idx}
          className="bg-secondary px-4 py-1 rounded-lg border shadow"
        >
          <AccordionItem value={history.id.toString()}>
            <AccordionTrigger>
              <div className="flex flex-row space-x-3 items-center justify-center w-full pr-4">
                <div className="">
                  {history.type === "deposit" ? (
                    <PiHandDeposit className="h-7 w-7 text-active" />
                  ) : (
                    <PiHandWithdraw className="h-7 w-7 text-yellow-400" />
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col items-start">
                    <div className="flex flex-row space-x-3">
                      <span>
                        {history.type === "deposit" ? "Desposit" : "Withdrawal"}
                      </span>
                      <div
                        className={clsx("px-2 border rounded-full", {
                          "border-yellow-400 text-yellow-400":
                            history.status === "pending",
                          "border-active text-active":
                            history.status === "approve",
                          "border-red-500 text-red-500":
                            history.status === "reject",
                        })}
                      >
                        <p className="text-xs">{history.status}</p>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400">
                      {history.created_at}
                    </p>
                  </div>
                </div>
                {/* <div>
                  
                </div> */}
                <div className="">
                  <span className="text-lg">
                    {`${history.type === "deposit" ? "+" : "-"} ${
                      history.amount
                    }`}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 grid-rows-3 gap-y-1 gap-x-5 text-sm border-t pt-3">
                <div>Account Name</div>
                <div>: {history.account_name}</div>
                <div>Account Number</div>
                <div>: {history.account_number}</div>
                <div>Provider</div>
                <div>: {history.provider}</div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default TransactionMobileView;
