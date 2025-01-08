import { PaymentProvider } from "@/@types/payment-provider";

const fetchPaymentProviders = async () => {
  const data = [
    {
      id: 19,
      account_name: "Test Account",
      account_number: "12345678",
      payment_type_id: 6,
      payment_type: "KBZ Pay",
      image: "https://agdashboard.pro/assets/img/paymentType/kpay.png",
    },
    {
      id: 20,
      account_name: "Test",
      account_number: "12345678",
      payment_type_id: 2,
      payment_type: "AYA Pay",
      image: "https://agdashboard.pro/assets/img/paymentType/aya_pay.png",
    },
    {
      id: 22,
      account_name: "Mr.Kaung",
      account_number: "97542106",
      payment_type_id: 4,
      payment_type: "CB Pay",
      image: "https://agdashboard.pro/assets/img/paymentType/cb_pay.png",
    },
  ];

  return data as PaymentProvider[];
};

export { fetchPaymentProviders };
