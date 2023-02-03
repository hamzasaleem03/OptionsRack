import React, { useRef, useState, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

import OpChainContext from '@/context/opChain-context'
import { useContext } from 'react'

const OptionChain = () => {
  const contractSize = {
    NIFTY: 50,
    BANKNIFTY: 25,
    FINNIFTY: 40,
  }
  const { expiryList } = useContext(OpChainContext)
  const { initialOpTable, setInitialOpTable } = useContext(OpChainContext)
  const { userInput } = useContext(OpChainContext)
  const { optionalChainListTemp, setOptionChainListTemp } =
    useContext(OpChainContext)
  const { positionsList, setPositionsList } = useContext(OpChainContext)
  const expiryDate = useRef()
  // console.log(optionalChainListTemp)
  const strikePrice = useRef()
  const fetchOptionChain = async () => {
    const fetchData = { ...userInput, lc_expiry: expiryDate.current.value }
    // console.log(fetchData)
    try {
      const res = await fetch('http://api.optionscrack.in/optionchain', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(fetchData),
      })
      const result = await res.json()
      let rawData = result.data
      let frequencyCounter1 = {}
      for (let strike of rawData) {
        if (frequencyCounter1[strike.StrikePrice]) {
          if (strike.OptType === 'CE') {
            // console.log('here')
            frequencyCounter1[strike.StrikePrice].CE = strike.LTP
          } else {
            frequencyCounter1[strike.StrikePrice].PE = strike.LTP
          }
        } else {
          frequencyCounter1[strike.StrikePrice] = Object.assign({}, strike)
          if (strike.OptType === 'CE') {
            frequencyCounter1[strike.StrikePrice].CE = strike.LTP
          } else {
            frequencyCounter1[strike.StrikePrice].PE = strike.LTP
          }
        }
      }
      let filteredResults = []
      Object.keys(frequencyCounter1).forEach((o) => {
        frequencyCounter1[o].size = 1
        filteredResults.push(frequencyCounter1[o])
      })
      filteredResults.sort((a, b) => a.StrikePrice - b.StrikePrice)
      setOptionChainListTemp(filteredResults)
      setInitialOpTable(filteredResults)
    } catch (err) {
      console.log('error 🔥')
      console.log(err)
    }

    // update current price whenever the expiryDate changes
    try {
      let fetchData = {
        lc_symbol: userInput.lc_symbol,
        lc_date: userInput.lc_date,
        lc_time: userInput.lc_time,
        lc_expiry: expiryDate.current.value,
      }
      console.log(fetchData)
      let tempPositionsData = []
      console.log(positionsList.length)
      for (let i = 0; i < positionsList.length; i++) {
        if (positionsList[i].isFuture) {
          fetchData.OptType = 'XX'
          fetchData.StrikePrice = '0.00'
          console.log('current price', fetchData)
          const res = await fetch('http://api.optionscrack.in/getstprice', {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(fetchData),
          })
          const currentPriceData = await res.json()
          console.log(currentPriceData)
          if (currentPriceData.data.length >= 1) {
            positionsList[i].currentPrice = currentPriceData.data[0].LTP
          }
        } else {
          fetchData.OptType = positionsList[i].optionType
          fetchData.StrikePrice = positionsList[i].strike
          console.log('current price', fetchData)
          const res = await fetch('http://api.optionscrack.in/getstprice', {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(fetchData),
          })
          const currentPriceData = await res.json()
          console.log(currentPriceData)
          if (currentPriceData.data.length >= 1) {
            positionsList[i].currentPrice = currentPriceData.data[0].LTP
          }
        }
        tempPositionsData.push(positionsList[i])
      }
      setPositionsList(tempPositionsData)
    } catch (err) {
      console.log(err)
    }
  }

  const searchStrikePrice = (e) => {
    const state = optionalChainListTemp.filter((a) =>
      a.StrikePrice.startsWith(strikePrice.current.value)
    )
    if (state.length >= 1) {
      setInitialOpTable([...state])
    } else {
      if (strikePrice.current.value) {
        setInitialOpTable([])
      } else {
        setInitialOpTable(optionalChainListTemp)
      }
    }
  }

  const addOption = async (selected) => {
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
    console.log('here')
    const optionData = {
      buySell: selected.type,
      symbol: selected.lc_symbol,
      entryDate: selected.lc_date,
      entryTime: selected.lc_time,
      optionType: selected.OptType,
      expiryDate: selected.lc_expiry,
      strike: selected.StrikePrice,
      size: selected.size,
      exitPrice: 0,
      contractSize: contractSize[selected.lc_symbol],
      entryPrice: selected.OptType === 'PE' ? selected.PE : selected.CE,
      currentPrice: selected.OptType === 'PE' ? selected.PE : selected.CE,
    }
    setPositionsList([...positionsList, optionData])
  }

  return (
    <div className="relative lg:mt-5">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base pb-1 font-semibold text-gray-900">Expiry</h1>
          <div className="flex items-end justify-between flex-wrap">
            <select
              id="Symbol"
              name="Symbol"
              autoComplete="country-name"
              ref={expiryDate}
              onChange={(e) => {
                fetchOptionChain()
              }}
              className="block h-[50px] w-full max-w-lg rounded-md border-transparent shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:max-w-[21rem] sm:text-xs"
            >
              {expiryList?.map((expiry, i) => (
                <option key={i}>{expiry.lc_expiry}</option>
              ))}
            </select>
            <div className="mt-0 flex h-[100%] flex-1 justify-center lg:justify-end">
              <div className="h  block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:max-w-[21rem] sm:text-xs">
                <label htmlFor="search" className="sr-only">
                  Strike Price
                </label>
                <div className="text-grey-200 relative focus-within:text-gray-400">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="search"
                    name="search"
                    ref={strikePrice}
                    className="bg-grey-400 block w-full rounded-md border border-transparent shadow-sm bg-opacity-25 py-4 pl-10 pr-3 focus:border-sky-500 focus:ring-sky-500 leading-5 text-sky-100 placeholder-sky-200 focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-xs"
                    placeholder="Strike Price"
                    onKeyUp={searchStrikePrice}
                    // onChange={}
                    type="search"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-col">
        <div className="overflow-x-auto sm:-mx-6">
          <div className="inline-block min-w-full py-4 align-middle md:px-4 lg:px-6">
            <div className="max-h-[250px] w-full overflow-y-scroll shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="w-full divide-y divide-gray-300 p-3">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-xs font-semibold text-gray-900"
                    >
                      Call LTP
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-xs font-semibold text-gray-900"
                    >
                      Strike
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-xs font-semibold text-gray-900"
                    >
                      Put LTP
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {initialOpTable?.map((current, i) => {
                    if (i < 20)
                      return (
                        <tr key={i}>
                          <td className="flex items-center justify-between whitespace-nowrap py-2 pl-4 pr-3 text-xs text-gray-500 sm:pl-6">
                            <p className="mr-3 w-[30px]">
                              {current.CE ? current.CE : '-'}
                            </p>
                            <input
                              className="max-w-[60px] rounded-md border-none bg-gray-100 px-3 py-1 text-center outline-none focus:outline-none"
                              defaultValue="1"
                              type="number"
                              onChange={(e) => {
                                current.size = e.target.value
                              }}
                              min={1}
                            />
                            <button
                              onClick={() => {
                                current.type = 'B'
                                current.OptType = 'CE'
                                addOption(current)
                                current.size = 1
                              }}
                              className="rounded-md bg-green-400 px-3 py-1 text-white transition-all duration-200 hover:-translate-y-[2px] hover:opacity-80 active:translate-y-[0.2]"
                            >
                              B
                            </button>
                            <button
                              onClick={() => {
                                current.type = 'S'
                                current.OptType = 'CE'
                                addOption(current)
                                current.size = 1
                              }}
                              className="rounded-md bg-red-400 px-3 py-1 text-white transition-all duration-200 hover:-translate-y-[2px] hover:opacity-80 active:translate-y-[0.2]"
                            >
                              S
                            </button>
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-xs font-medium text-gray-900">
                            <p>{current.StrikePrice.split('.')[0]}</p>
                          </td>
                          <td className="-ml-3 flex items-center justify-between whitespace-nowrap py-2 pl-4 pr-3 text-xs text-gray-500 sm:pl-6">
                            <button
                              onClick={() => {
                                current.type = 'B'
                                current.OptType = 'PE'
                                addOption(current)
                                current.size = 1
                              }}
                              className="rounded-md bg-green-400 px-3 py-1 text-white transition-all duration-200 hover:-translate-y-[2px] hover:opacity-80 active:translate-y-[0.2]"
                            >
                              B
                            </button>
                            <button
                              onClick={() => {
                                current.type = 'S'
                                current.OptType = 'PE'
                                addOption(current)
                                current.size = 1
                              }}
                              className="rounded-md bg-red-400 px-3 py-1 text-white transition-all duration-200 hover:-translate-y-[2px] hover:opacity-80 active:translate-y-[0.2]"
                            >
                              S
                            </button>
                            <input
                              className="max-w-[60px] rounded-md border-none bg-gray-100 px-3 py-1 text-center outline-none focus:outline-none"
                              defaultValue="1"
                              type="number"
                              onChange={(e) => {
                                current.size = e.target.value
                              }}
                              min={1}
                            />

                            <p className="mr-3 w-[30px]">
                              {current.PE ? current.PE : '-'}
                            </p>
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

export default OptionChain
