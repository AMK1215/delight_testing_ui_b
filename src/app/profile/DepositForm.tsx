"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { fetchPaymentProviders } from "@/services/paymentProviderService";
import { XIcon } from "lucide-react";

interface DepositFormProps {
  onDialogClose: () => void;
}

// Define form schema with zod
const formSchema = z.object({
  agent_payment_type_id: z.string().min(1, { message: "It is required!" }),
  amount: z.string().min(1, { message: "It is required!" }),
  reference_no: z.string().min(1, { message: "It is required!" }),
});

const DepositForm = ({ onDialogClose }: DepositFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agent_payment_type_id: "",
      amount: "",
      reference_no: "",
    },
  });

  const { data = [] } = useQuery({
    queryKey: ["GET_PAYMENT_PROVIDER"],
    queryFn: fetchPaymentProviders,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="agent_payment_type_id"
          render={({ field }) => {
            const selectedProvider = data.find(
              (payment) => payment.id.toString() === field.value
            );

            return (
              <FormItem>
                <FormLabel>Payment Provider</FormLabel>
                {selectedProvider ? (
                  <div className="flex flex-row space-x-2 items-center border p-3 rounded-md bg-gray-800">
                    <img
                      src={selectedProvider.image}
                      className="h-[40px] w-[40px] rounded-md"
                    />
                    <div className="space-y-1 flex-grow">
                      <span className="block font-medium text-gray-100">
                        {selectedProvider.account_name}
                      </span>
                      <span className="text-sm text-gray-400">
                        {selectedProvider.account_number}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => field.onChange(undefined)}
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Bank" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-secondary">
                      {data.map((payment, idx) => (
                        <SelectItem
                          key={idx}
                          value={payment.id.toString()}
                          className="hover:border hover:border-active"
                        >
                          <div className="flex flex-row space-x-2">
                            <img
                              src={payment.image}
                              className="h-[40px] w-[40px] rounded-md"
                            />
                            <div className="space-y-1 flex flex-col">
                              <span>{payment.account_name}</span>
                              <span className="text-sm text-gray-400">
                                {payment.account_number}
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <FormMessage>
                  {form.formState.errors?.agent_payment_type_id?.message}
                </FormMessage>
              </FormItem>
            );
          }}
        />
        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="amount">Amount</Label>
              <FormControl>
                <Input
                  type="text"
                  id="amount"
                  placeholder="Enter Amount"
                  {...field}
                  onKeyDown={(e) => {
                    // Allow only numeric input
                    if (
                      !/^[0-9]+$/.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== "Delete" &&
                      e.key !== "ArrowLeft" &&
                      e.key !== "ArrowRight" &&
                      e.key !== "Tab"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  className="border border-input"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors?.amount?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          name="reference_no"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="reference_no">Reference Number</Label>
              <FormControl>
                <Input
                  type="text"
                  id="refrence_no"
                  placeholder="Enter Reference Number"
                  className="border border-input"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors?.reference_no?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <div className="flex flex-row justify-end items-center space-x-3">
          <Button
            type="button"
            className="border border-active hover:bg-secondary"
            onClick={onDialogClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-active text-black hover:text-white hover:bg-secondary hover:border hover:border-active"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DepositForm;
