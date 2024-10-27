"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 100,
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

interface ChartTransactionUserProps {
  rewardeds: any[];
  transactions: any[];
}

const ChartTransactionUser: React.FC<ChartTransactionUserProps> = ({
  rewardeds,
  transactions,
}) => {
  const aggregateDataByMonth = (rewardeds, transactions) => {
    const monthlyData = {
      totalRewardeds: Array(12).fill(0),
      totalTransactions: Array(12).fill(0),
    };

    rewardeds.forEach((rewarded) => {
      const date = new Date(rewarded.claimedAt);
      const monthIndex = date.getMonth();

      if (monthIndex >= 0 && monthIndex < 12) {
        monthlyData.totalRewardeds[monthIndex] += 1;
      }
    });

    transactions.forEach((transaction) => {
      const date = new Date(transaction.createdDate);
      const monthIndex = date.getMonth();

      if (monthIndex >= 0 && monthIndex < 12) {
        monthlyData.totalTransactions[monthIndex] += 1;
      }
    });

    return monthlyData;
  };

  // Get aggregated data
  const aggregatedData = aggregateDataByMonth(rewardeds, transactions);

  const series = [
    {
      colorFill: "primary",
      label: "Total Rewardeds",
      date: "01.01.2024 - 01.01.2025",
      name: "Rewardeds",
      data: aggregatedData.totalRewardeds,
    },

    {
      colorFill: "secondary",
      label: "Total Transactions",
      date: "01.01.2024 - 01.01.2025",
      name: "Transactions",
      data: aggregatedData.totalTransactions,
    },
  ];
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          {/* <div className="flex min-w-47.5">
                        <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                            <span className={"block h-2.5 w-full max-w-2.5 rounded-full bg-primary"}></span>
                        </span>
                        <div className="w-full">
                            <p className="font-semibold text-primary">Total Revenue</p>
                            <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
                        </div>
                    </div>
                    <div className="flex min-w-47.5">
                        <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
                            <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
                        </span>
                        <div className="w-full">
                            <p className="font-semibold text-secondary">Total Sales</p>
                            <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
                        </div>
                    </div> */}
          {series.map((item) => {
            let colorFill = item.colorFill;
            if (!RegExp(/^[0-9A-Za-z]+$/).test(colorFill))
              colorFill = `[${colorFill}]`;
            return (
              <div key={item.name} className="flex min-w-47.5">
                <span
                  className={`mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-${colorFill}`}
                >
                  <span
                    className={`block h-2.5 w-full max-w-2.5 rounded-full bg-${colorFill}`}
                  ></span>
                </span>
                <div className="w-full">
                  <p className={`font-semibold text-${colorFill}`}>
                    {item.label}
                  </p>
                  <p className="text-sm font-medium">{item.date}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button
              className="rounded bg-white px-3 py-1 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark"
              onClick={() => console.log("Day button clicked")}
            >
              Day
            </button>
            <button
              className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark"
              onClick={() => console.log("Week button clicked")}
            >
              Week
            </button>
            <button
              className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark"
              onClick={() => console.log("Month button clicked")}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTransactionUser;
