import CryptoAnalytics from "@/components/Crypto/Analytics/analytics";
import WithdrawHistory from "@/components/Crypto/Tables/withdrawHistory";
import TransactionTable from "@/components/Crypto/Tables/transactionHistory";
import PageTitle from "@/components/ui/pageTitle";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Crypto() {
  return (
    <div className="flex flex-col space-y-4">
      <PageTitle
        title={`Crypto Wallets`}
        description="Monitor your cryptocurrency balances and withdraw funds to your payout address."
      />
      <CryptoAnalytics />
      <Tabs defaultValue="withdraw" className="w-full">
        <TabsList className="h-9">
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="withdraw">
          <WithdrawHistory />
        </TabsContent>
        <TabsContent value="transactions">
          <TransactionTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
