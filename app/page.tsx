import IncomeDataCards from "./components/IncomeDataCards";
import { DashboardLayout } from "./components/DashboardLayout";
import { getDashboardData } from "@/app/lib/data";
import DualTableDashboard from "./components/DualTableDashboard";
import DualChartDashboard from "./components/DualChartDashboard";
import { getExchangeRates } from "@/app/lib/currency";

export default async function Home() {

  const data = await getDashboardData()

  if (!data) {
    return <div>Please log in to view your dashboard.</div>
  }

  const rates = await getExchangeRates("USD");

  return (
    <main className="bg-[rgd(var(--background))]" id="main-dashboard-data">
      <DashboardLayout>
        <div className="flex flex-row w-full gap-4">
          <div className="flex-1">
            <IncomeDataCards data={data} />
            <div className="m-4">
              <DualChartDashboard data={data} baseCurrency={data.userBaseCurrency} rates={rates}/>
            </div>
          </div>
          <div className="w-fit">
            <DualTableDashboard data={data} baseCurrency={data.userBaseCurrency} rates={rates}/>
          </div>
        </div>
      </DashboardLayout>
    </main>
  )
};