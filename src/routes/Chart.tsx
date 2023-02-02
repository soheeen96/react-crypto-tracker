import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 5000,
    }
  );

  let Data = data ?? [];

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: Data.map((price) => ({
                x: price.time_close * 1000,
                y: [price.open, price.high, price.low, price.close],
              })),
            },
          ]}
          options={{
            theme: { mode: isDark ? "dark" : "light" },
            chart: {
              height: 500,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            grid: { show: true },
            stroke: { curve: "smooth", width: 3 },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#f37362",
                  downward: "#3C90EB",
                },
              },
            },
            yaxis: { show: false },
            xaxis: {
              // axisBorder: { show: false },
              // axisTicks: { show: false },
              // labels: { show: false },
              type: "datetime",
              categories: data?.map((price) => +price.time_close * 1000),
            },
            fill: {
              type: "fill",
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
