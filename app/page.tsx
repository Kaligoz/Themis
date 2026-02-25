import IncomeDataCards from "./components/IncomeDataCards";
import { DashboardLayout } from "./components/DashboardLayout";
import { getDashboardData } from "@/app/lib/data";
import DualTableDashboard from "./components/DualTableDashboard";
import DualChartDashboard from "./components/DualChartDashboard";
import { getExchangeRates } from "@/app/lib/currency";
import { cookies } from "next/headers";

export default async function Home() {

  const data = await getDashboardData()

  const cookieStore = await cookies()
  console.log("Cookies found on server:", cookieStore.getAll())

  if (!data) {
    return <div className="flex justify-center items-center text-2xl font-bold">Please log in to view your dashboard.</div>
  }

  const rates = await getExchangeRates("USD");

  return (
    <main className="bg-[rgd(var(--background))]" id="main-dashboard-data">
      <DashboardLayout>
        <div className="flex md:flex-row flex-col w-full md:gap-4">
          <div className="flex-1 min-w-0">
            <IncomeDataCards data={data} baseCurrency={data.userBaseCurrency} rates={rates}/>
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