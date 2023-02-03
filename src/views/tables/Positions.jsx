import OpChainContext from '@/context/opChain-context'
import React, { useContext, useState } from 'react'
import { TrashIcon } from '@heroicons/react/20/solid'

const Positions = () => {
  const { positionsList, setPositionsList } = useContext(OpChainContext)
  const [isDeleting, setIsDeleting] = useState(false)
  const [show, setShow] = useState(false)

  return (
    <div className="w-full lg:mt-5">
      <button
        onClick={() => setShow(!show)}
        className="flex w-full items-end justify-end gap-2 text-right font-semibold"
      >
        More
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`icon icon-tabler icon-tabler-arrow-up-circle transform duration-300 ease-in-out ${
            show ? `rotate-90` : `rotate-180`
          }`}
          width={24}
          height={24}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#2c3e50"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx={12} cy={12} r={9} />
          <line x1={12} y1={8} x2={8} y2={12} />
          <line x1={12} y1={8} x2={12} y2={16} />
          <line x1={16} y1={12} x2={12} y2={8} />
        </svg>
      </button>
      <div className="mt-2 flex w-full flex-col">
        <div className="w-full overflow-x-auto">
          <div className="inline-block w-full py-2 align-middle">
            <div className="max-h-[250px] w-full overflow-y-scroll shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table
                className="w-full divide-y divide-gray-300 p-3"
                cellSpacing="100px"
              >
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-4 py-3.5 text-center text-xs font-semibold text-gray-900"
                    >
                      Buy/sell
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-4 py-3.5 text-center text-xs font-semibold text-gray-900"
                    >
                      Symbol
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-4 py-3.5 text-center text-xs font-semibold text-gray-900"
                    >
                      Entry date
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-4 py-3.5 text-center text-xs font-semibold text-gray-900"
                    >
                      Entry Time
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-4 py-3.5 text-center text-xs font-semibold text-gray-900"
                    >
                      Option Type(CE/PE)
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-4 py-3.5 text-center text-xs font-semibold text-gray-900"
                    >
                      Expiry Date
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-4 py-3.5 text-center text-xs font-semibold text-gray-900"
                    >
                      Strike
                    </th>
                    <div className={`${show ? `flex` : `hidden`}`}>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-4 py-3.5 text-center text-xs font-semibold text-gray-900"
                      >
                        Size
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-4 py-3.5 text-center text-xs font-semibold text-gray-900"
                      >
                        Contact Size
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-4 py-3.5 text-center text-xs font-semibold text-gray-900"
                      >
                        Entry Price
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-4 py-3.5 text-center text-xs font-semibold text-gray-900"
                      >
                        Exit Price
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-4 py-3.5 text-center text-xs font-semibold text-gray-900"
                      >
                        Current Price
                      </th>
                      <th
                        scope="col"
                        className="hidden whitespace-nowrap px-4 py-3.5 text-center text-xs font-semibold text-gray-900"
                      >
                        P&L
                      </th>
                      <th
                        scope="col"
                        className="hidden whitespace-nowrap px-4 py-3.5 text-center text-xs font-semibold text-gray-900"
                      >
                        Delete
                      </th>
                    </div>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {positionsList?.map((current, i) => {
                    return (
                      <tr key={i}>
                        <td
                          scope="col"
                          className={`whitespace-nowrap px-4 py-3.5 text-center text-xs font-semibold ${
                            current.buySell == 'B'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {current.buySell}
                        </td>
                        <td
                          scope="col"
                          className="whitespace-nowrap px-4 py-3.5 text-center text-xs font-semibold text-gray-700"
                        >
                          {current.symbol}
                        </td>
                        <td
                          scope="col"
                          className="whitespace-nowrap px-4 py-3.5 text-center text-xs text-gray-500"
                        >
                          {current.entryDate}
                        </td>
                        <td
                          scope="col"
                          className="whitespace-nowrap px-4 py-3.5 text-center text-xs text-gray-500"
                        >
                          {current.entryTime}
                        </td>
                        <td
                          scope="col"
                          className="whitespace-nowrap px-4 py-3.5 text-center text-xs text-gray-700"
                        >
                          {current.optionType}
                        </td>
                        <td
                          scope="col"
                          className="whitespace-nowrap px-4 py-3.5 text-center text-xs text-gray-500"
                        >
                          {current.expiryDate}
                        </td>
                        <td
                          scope="col"
                          className="whitespace-nowrap px-4 py-3.5 text-center text-xs font-medium text-gray-900"
                        >
                          {current.strike.split('.')[0]}
                        </td>
                        <div className={`${show ? `flex` : `hidden`}`}>
                          <td
                            scope="col"
                            className="whitespace-nowrap px-4 py-3.5 text-center text-xs font-bold text-gray-900"
                          >
                            {current.size}
                          </td>
                          <td
                            scope="col"
                            className="whitespace-nowrap px-4 py-3.5 text-center text-xs text-gray-500"
                          >
                            {current.contractSize}
                          </td>
                          <td
                            scope="col"
                            className="whitespace-nowrap px-4 py-3.5 text-center text-xs text-gray-900"
                          >
                            {Math.round(current.entryPrice * 100) / 100}
                          </td>
                          <td
                            scope="col"
                            className="whitespace-nowrap px-4 py-3.5 text-center text-xs text-gray-900"
                          >
                            {isDeleting && (
                              <main
                                class="absolute top-0 left-0 h-[80%] w-[100%] overflow-hidden bg-transparent font-sans text-gray-900 antialiased"
                                onClick={() => {
                                  setIsDeleting(false)
                                }}
                              >
                                <div class="relative h-[100%] px-4 md:flex md:items-center md:justify-center">
                                  <div class="absolute inset-0 z-10 h-full w-full bg-black opacity-25"></div>
                                  <div class="fixed inset-x-0 bottom-0 z-50 mx-4 my-auto rounded-lg bg-white p-4 md:relative md:mx-auto md:max-w-md">
                                    <div class="items-center md:flex">
                                      <div class="mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-gray-300">
                                        <i class="bx bx-error text-3xl">
                                          <TrashIcon className="h-[25px] text-black" />
                                        </i>
                                      </div>
                                      <div class="md mt-4 text-center md:mt-0 md:ml-6">
                                        <p class="font-bold">
                                          Delete this entry
                                        </p>
                                        <div className="flex w-[100%]">
                                          <p class="mt-1 text-xs text-gray-700">
                                            Are you sure you want to delete this
                                            entry?
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="mt-4 text-center md:flex md:justify-end md:text-right">
                                      <button
                                        class="block w-full rounded-lg bg-red-200 px-4 py-3 text-xs font-semibold text-red-700 md:order-2 md:ml-2 md:inline-block md:w-auto md:py-2"
                                        onClick={() => {
                                          let temp = []
                                          positionsList.forEach((d) => {
                                            if (d !== current) {
                                              temp.push(d)
                                            }
                                          })
                                          setPositionsList(temp)
                                          setIsDeleting(false)
                                        }}
                                      >
                                        Delete Entry
                                      </button>
                                      <button
                                        class="mt-4 block w-full rounded-lg bg-gray-200 px-4 py-3 text-xs font-semibold md:order-1 md:mt-0 md:inline-block
                                      md:w-auto md:py-2"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </main>
                            )}
                            <input
                              className="max-w-[60px] rounded-md border-none bg-gray-100 px-3 py-1 text-center outline-none focus:outline-none"
                              defaultValue={current.exitPrice}
                              onChange={(e) => {
                                let temp = []
                                positionsList.forEach((d) => {
                                  if (d === current) {
                                    d.exitPrice = e.target.value
                                    temp.push(d)
                                  } else {
                                    temp.push(d)
                                  }
                                })
                                setPositionsList(temp)
                              }}
                            />
                          </td>
                          <td
                            scope="col"
                            className="whitespace-nowrap px-10 py-3.5 text-center text-xs font-bold text-gray-900"
                          >
                            {Math.round(current.currentPrice * 100) / 100}
                          </td>
                          <td
                            scope="col"
                            className="whitespace-nowrap px-10 py-3.5 text-center text-xs font-semibold text-gray-900"
                          >
                            {Math.round(
                              (current.exitPrice == 0 &&
                                (current.currentPrice - current.entryPrice) *
                                  current.size *
                                  current.contractSize *
                                  (current.buySell === 'S' ? -1 : 1)) * 100
                            ) / 100 || '-'}
                          </td>
                          <td
                            scope="col"
                            className="whitespace-nowrap px-10 py-3.5 text-center text-xs font-semibold text-gray-900"
                          >
                            <a
                              className="cursor-pointer"
                              onClick={() => {
                                setIsDeleting(true)
                              }}
                            >
                              <TrashIcon className="h-[25px] text-red-600" />
                            </a>
                          </td>
                        </div>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Positions
