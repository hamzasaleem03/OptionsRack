import OpChainContext from '@/context/opChain-context'
import React, { useContext } from 'react'

const Futures = () => {
  const contractSize = {
    NIFTY: 50,
    BANKNIFTY: 25,
    FINNIFTY: 40,
  }
  const { futuresList } = useContext(OpChainContext)
  const { positionsList, setPositionsList } = useContext(OpChainContext)

  const addOption = (selected) => {
    let temp = []
    let i = 0
    for (let c of positionsList) {
      if (
        c.buySell === selected.type &&
        c.symbol === selected.lc_symbol &&
        c.entryDate === selected.lc_date &&
        c.entryTime === selected.lc_time &&
        c.expiryDate === selected.lc_expiry &&
        c.strike === selected.StrikePrice &&
        c.optionType === selected.OptType
      ) {
        c.size = c.size * 1 + selected.size * 1
        // c.entryPrice =
        //   c.entryPrice * 1 +
        //   (selected.OptType === 'PE' ? selected.PE : selected.CE) *
        //     1 *
        //     selected.size *
        //     1
        positionsList[i] = c
        setPositionsList(positionsList)
        return
      }
      i++
    }

    const optionData = {
      buySell: selected.type,
      symbol: selected.lc_symbol,
      entryDate: selected.lc_date,
      entryTime: selected.lc_time,
      optionType: selected.OptType,
      expiryDate: selected.lc_expiry,
      strike: selected.StrikePrice,
      exitPrice: 0,
      size: selected.size,
      contractSize: contractSize[selected.lc_symbol],
      entryPrice: selected.LTP,
      currentPrice: selected.LTP,
      isFuture: true,
    }
    setPositionsList([...positionsList, optionData])
  }
  return (
    <div className="lg:mt-5">
      <div className="mt-2 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="max-h-[250px] w-full overflow-y-scroll shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="w-full divide-y divide-gray-300 p-3">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Expiry
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    ></th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    ></th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Price (LTP)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {futuresList?.map((current, i) => {
                    return (
                      <tr key={i}>
                        <td className="flex items-center justify-between whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                          <p className="w-[30px]">{current.lc_expiry}</p>
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                          <div className="flex justify-center">
                            <button
                              onClick={() => {
                                current.type = 'B'
                                current.OptType = 'XX'
                                current.StrikePrice = '0'
                                addOption(current)
                                current.size = 1
                              }}
                              className="rounded-md bg-green-400 px-3 py-1 text-white  transition-all duration-200 hover:-translate-y-[2px] hover:opacity-80 active:translate-y-[0.2]"
                            >
                              B
                            </button>
                            <button
                              onClick={() => {
                                current.type = 'S'
                                current.OptType = 'XX'
                                current.StrikePrice = '0'
                                addOption(current)
                                current.size = 1
                              }}
                              className="rounded-md bg-red-400 px-3 py-1 text-white transition-all  duration-200 hover:-translate-y-[2px] hover:opacity-80 active:translate-y-[0.2] md:ml-5"
                            >
                              S
                            </button>
                          </div>
                        </td>
                        <td>
                          <input
                            className="max-w-[100px] rounded-md border-none bg-gray-100 px-3 py-1 text-center outline-none focus:outline-none"
                            defaultValue="1"
                            min={1}
                            type="number"
                            onChange={(e) => {
                              current.size = e.target.value
                            }}
                          />
                        </td>
                        <td className="flex items-center justify-between whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                          {current.LTP.split('.')[0]}
                        </td>
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

export default Futures
