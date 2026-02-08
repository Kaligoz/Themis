import IncomeDataCards from "./components/IncomeDataCards";
import { DashboardLayout } from "./components/DashboardLayout";
import { getDashboardData } from "@/app/lib/data";
import { TableDebts } from "./components/tables/TableDebts";
import { TablePurchases } from "./components/tables/TablePurchases";
import { TableSubscription } from "./components/tables/TableSubscriptions";

export default async function Home() {

  const data = await getDashboardData()

  if (!data) {
    return <div>Please log in to view your dashboard.</div>
  }

  return (
    <main className="bg-[rgd(var(--background))]">
      <DashboardLayout >
        <IncomeDataCards data={data} />
        <TableDebts data={data} />
        <TablePurchases data={data} />
        <TableSubscription data={data} />
      </DashboardLayout>
    </main>
  )
};