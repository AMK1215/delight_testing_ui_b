import { PiHandDeposit } from "react-icons/pi";
import { PiHandWithdraw } from "react-icons/pi";
import { Accordion, AccordionContent } from "@radix-ui/react-accordion";
import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import clsx from "clsx";
import { TransactionHistory } from "@/@types/transaction-history";
import { translations } from "@/configs/translations";
import { useLanguage } from "@/context/LanguageContext";

interface TransactionMobileViewProps {
  data: TransactionHistory[];
  type: "deposit" | "withdraw";
}

const TransactionMobileView = ({ data, type }: TransactionMobileViewProps) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-2">
      {data.length > 0 ? (
        data.map((history, idx) => (
          <Accordion
            type="single"
            collapsible
            key={idx}
            className="bg-secondary px-4 py-1 rounded-lg border shadow"
          >
            <AccordionItem value={history.id.toString()}>
              <AccordionTrigger>
                <div className="flex flex-row space-x-3 items-center justify-center w-full pr-4">
                  <div>
                    {type === "deposit" ? (
                      <PiHandDeposit className="h-7 w-7 text-active" />
                    ) : (
                      <PiHandWithdraw className="h-7 w-7 text-yellow-400" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col items-start">
                      <div className="flex flex-row space-x-3">
                        <span>
                          {type === "deposit" ? "Deposit" : "Withdrawal"}
                        </span>
                        <div
                          className={clsx(
                            "px-2 border flex items-center justify-center rounded-full",
                            {
                              "border-yellow-400 text-yellow-400":
                                history.status === "Pending",
                              "border-active text-active":
                                history.status === "Success",
                              "border-red-500 text-red-500":
                                history.status === "Reject",
                            }
                          )}
                        >
                          <p className="text-xs">{history.status}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">
                        {history.datetime}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="text-lg">{`${history.amount}`}</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 grid-rows-3 gap-y-1 gap-x-5 text-sm border-t pt-3">
                  <div>{translations.accountName[language]}</div>
                  <div>: {history.account_name}</div>
                  <div>{translations.accountNumber[language]}</div>
                  <div>: {history.account_number}</div>
                  <div>Payment Provider</div>
                  <div>: {history.payment_type}</div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))
      ) : (
        <div className="text-center text-gray-500 py-4">
          {type === "deposit"
            ? "No deposit history available."
            : "No withdrawal history available."}
        </div>
      )}
    </div>
  );
};

export default TransactionMobileView;
