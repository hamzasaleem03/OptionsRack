// import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
// import Chart from "chart.js/auto";
// // import React, { useEffect } from "react";
// import {
//   CursorArrowRaysIcon,
//   EnvelopeOpenIcon,
//   UsersIcon,
// } from '@heroicons/react/24/outline'
// // import { useEffect } from 'react';

// const stats = [
//   {
// //     id: 1,
// //     name: 'Max Profit',
// //     stat: '71,897',
// //     icon: UsersIcon,
// //     change: '122',
// //     changeType: 'increase',
// //   },
// //   {
// //     id: 2,
// //     name: 'Max Loss',
// //     stat: '71,897',
// //     icon: UsersIcon,
// //     change: '122',
// //     changeType: 'increase',
// //   },
// //   {
// //     id: 3,
// //     name: 'Premium',
// //     stat: '58.16%',
// //     icon: EnvelopeOpenIcon,
// //     change: '5.4%',
// //     changeType: 'increase',
// //   },
//     id: 4,
//     name: 'Position Delta',
//     stat: '58.16%',
//     icon: EnvelopeOpenIcon,
//     change: '5.4%',
//     changeType: 'increase',
//   },
//   {
//     id: 5,
//     name: 'Breakdown',
//     stat: '58.16%',
//     icon: EnvelopeOpenIcon,
//     change: '5.4%',
//     changeType: 'increase',
//   },
//   {
//     id: 6,
//     name: 'PL',
//     stat: '58.16%',
//     icon: EnvelopeOpenIcon,
//     change: '5.4%',
//     changeType: 'increase',
//   },
// ]

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }
// const Stat2 = () => {
//    return (
//     <div className='col-span-2 py-0 lg:px-0 md:pl-0 pl-4'>
//       <dl className="grid grid-cols-1 gap-5 sm:grid-cols-1 xl:grid-cols-1">
//         {stats.map((item) => (
//           <div
//             key={item.id}
//             className="relative overflow-hidden  bg-white px-2 pt-4 pb-4 sm:px-6 sm:pt-6 flex justify-between items-start border rounded-xl shadow-lg  hover:shadow-xl ease-in-out transform duration-300 xl:h-[140px]"
//           >
//             {/* <div> */}
//             <dt>
//               <div className="absolute rounded-md bg-sky-500 p-3">
//                 <item.icon className="h-8 w-8 text-white" aria-hidden="true" />
//               </div>
//             </dt>
//             <dd className=" flex flex-col items-baseline pb-1 sm:pb-1">
//               <p className="truncate text-sm font-medium text-gray-500">
//                 {item.name}
//               </p>
//               <p className="text-xl font-semibold text-gray-900">{item.stat}</p>
//             </dd>
//             {/* </div> */}
//           </div>
//         ))}
//       </dl>
//     </div>
//   )
// }

// export default Stat2
