import CryptoAnalytics from "@/components/Crypto/Analytics/analytics";
import TransactionTable from "@/components/Crypto/Tables/transactionHistory";
import PageTitle from "@/components/ui/pageTitle";

export default function Crypto() {
  return (
    <div className="flex flex-col space-y-4">
      <PageTitle
        title={`Crypto Wallets`}
        description="Monitor your cryptocurrency balances and withdraw funds to your payout address."
      />
      <CryptoAnalytics />

      <TransactionTable />
    </div>
  );
}
