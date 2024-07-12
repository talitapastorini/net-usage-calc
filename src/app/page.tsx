import { Calculator } from "@/components/calculator";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between ">
      <div className="flex flex-col w-full h-full ">
        <div className="h-1/4 bg-gradient-to-r from-red-500 to-red-700">
          <h1 className="text-center text-yellow-300 text-2xl font-bold p-12">
            NetUsageCalc
          </h1>
        </div>
        <div className="h-3/4 bg-slate-100"></div>
        <Calculator />
      </div>
    </main>
  );
}
