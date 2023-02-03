import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import Chart from 'chart.js/auto'
// import React, { useEffect } from "react";
import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
// import { useEffect } from 'react';

const stats = [
  {
    id: 1,
    name: 'Max Profit',
    stat: '71,897',
    icon: UsersIcon,
    change: '122',
    changeType: 'increase',
  },
  {
    id: 2,
    name: 'Max Loss',
    stat: '71,897',
    icon: UsersIcon,
    change: '122',
    changeType: 'increase',
  },
  {
    id: 3,
    name: 'Premium',
    stat: '58.16%',
    icon: EnvelopeOpenIcon,
    change: '5.4%',
    changeType: 'increase',
  },
  {
    id: 4,
    name: 'Position Delta',
    stat: '58.16%',
    icon: EnvelopeOpenIcon,
    change: '5.4%',
    changeType: 'increase',
  },
  {
    id: 5,
    name: 'Breakdown',
    stat: '58.16%',
    icon: EnvelopeOpenIcon,
    change: '5.4%',
    changeType: 'increase',
  },
  {
    id: 6,
    name: 'PL',
    stat: '58.16%',
    icon: EnvelopeOpenIcon,
    change: '5.4%',
    changeType: 'increase',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const Stat = () => {
  // useEffect(() => {
  //   const data = {
  //     datasets: [
  //       {
  //         label: "My First Dataset",
  //         data: [10, 100, 20, 50, 20, 300],
  //         borderWidth: 0,
  //         cutout: 60,
  //         backgroundColor: [
  //           "#fff",
  //           "#0EA5E9",
  //           "#fff",
  //           "#0EA5E9",
  //           "#fff",
  //           "#0EA5E9",
  //         ],
  //         hoverOffset: 4,
  //       },
  //     ],
  //   };

  //   const config = {
  //     type: "doughnut",
  //     data: data,
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: true,
  //       plugins: {
  //         legend: {
  //           position: "bottom",
  //         },
  //       },
  //     },
  //   };
  //   const myChart = new Chart("myChart1", config);
  //   const myChart2 = new Chart("myChart2", config);
  //   const myChart3 = new Chart("myChart3", config);
  //   const myChart4 = new Chart("myChart4", config);

  //   return () => {
  //     myChart.destroy();
  //     myChart2.destroy();
  //     myChart3.destroy();
  //     myChart4.destroy();
  //   };
  // });
  return (
    <div className="md-px-0 col-span-2 py-10 px-4 md:py-10 xl:py-4">
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 xl:grid-cols-6">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative flex  transform items-start justify-between overflow-hidden rounded-xl border bg-white px-2 pt-4 pb-4 shadow-lg duration-300  ease-in-out hover:shadow-xl sm:px-6 sm:pt-6 lg:h-[120px]"
          >
            {/* <div> */}
            <dt>
              <div className="absolute rounded-md bg-sky-500 p-3">
                <item.icon className="h-8 w-8 text-white" aria-hidden="true" />
              </div>
            </dt>
            <dd className=" flex flex-col items-baseline pb-1 sm:pb-1">
              <p className="truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
              <p className="text-xl font-semibold text-gray-900">{item.stat}</p>
            </dd>
            {/* </div> */}
            {/* <div className='w-[150px]'>
            <canvas id="myChart1" class="w-full"></canvas>
            </div> */}
          </div>
        ))}
      </dl>
    </div>
  )
}

export default Stat
