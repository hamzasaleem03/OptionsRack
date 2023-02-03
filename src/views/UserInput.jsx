import React, { useEffect } from 'react'
import { useRef, useContext } from 'react'
import OpChainContext from '@/context/opChain-context'
import { AudioPlayer } from '@/components/player/AudioPlayer'
import { result } from 'lodash'
import { RewindButton } from '@/components/player/RewindButton'
import { ForwardButton } from '@/components/player/ForwardButton'

const UserInput = () => {
  const { expiryList, updateExpiryList } = useContext(OpChainContext)
  const { setInitialOpTable } = useContext(OpChainContext)
  const timeDate = useRef()
  const symbol = useRef()
  const dateWarning = useRef()
  const { setUserInput } = useContext(OpChainContext)
  const { setOptionChainListTemp } = useContext(OpChainContext)
  const { setFuturesList } = useContext(OpChainContext)
  const { positionsList, setPositionsList } = useContext(OpChainContext)
  const { selectedDate, setSelectedDate } = useContext(OpChainContext)
  const { isDragging } = useContext(OpChainContext)
  const { startTime, endTime } = useContext(OpChainContext)

  // Fetch the expiry list and futures
  const fetchExpiryAndFutures = async () => {
    console.log(timeDate.current.value)
    let initialExpiry
    if (timeDate.current.value && symbol.current.value) {
      const fetchData = {
        lc_symbol: symbol.current.value,
        lc_date: timeDate.current.value.split('T')[0],
        lc_time: timeDate.current.value.split('T')[1] + ':00',
      }
      setUserInput(fetchData)
      try {
        const res = await fetch('http://api.optionscrack.in/expiry', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(fetchData),
        })
        const result = await res.json()
        updateExpiryList(result.data)
        initialExpiry = result.data[0]?.lc_expiry
      } catch (err) {
        console.log('error fetching expiry list 🔥')
        console.log(err)
      }

      // Fetch Initial OptionChain table
      if (initialExpiry) {
        const fetchData = {
          lc_symbol: symbol.current.value,
          lc_date: timeDate.current.value.split('T')[0],
          lc_time: timeDate.current.value.split('T')[1] + ':00',
          lc_expiry: initialExpiry,
        }
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
                console.log('here')
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
          console.log(filteredResults)
        } catch (err) {
          console.log('error 🔥')
          console.log(err)
        }
      } else {
        setInitialOpTable([])
      }
      // Fetch futures data
      try {
        const res = await fetch('http://api.optionscrack.in/futures', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(fetchData),
        })
        const futures = await res.json()

        const futuresList = futures.data
        futuresList.forEach((f) => {
          f.size = 1
        })
        setFuturesList(futuresList)
      } catch (err) {
        console.log('error fetching futures 🔥')
        console.log(err)
      }
      // update current price of positionsTable
      if (initialExpiry) {
        try {
          let fetchData = {
            lc_symbol: symbol.current.value,
            lc_date: timeDate.current.value.split('T')[0],
            lc_time: timeDate.current.value.split('T')[1] + ':00',
            lc_expiry: initialExpiry,
          }
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
    }
  }

  const timeUpdate = (val) => {
    console.log('====================================')
    console.log(selectedDate)
    console.log('====================================')
    var date = new Date(selectedDate).getTime(),
      newDate,
      ndate
    if (!date) console.log('Not FOund')
    if (val.indexOf('d') != -1) {
      var daych = parseInt(val.replace('d', '')) * 1000 * 60 * 60 * 24
      ndate = new Date(date + daych)
    }
    if (val.indexOf('m') != -1) {
      var ch = parseInt(val.replace('d', ''))
      ch *= 1000 * 60
      ndate = new Date(date + ch)
      if (ndate.getHours() == 15 && ndate.getMinutes() > 29) {
        var daych = 1000 * 60 * 60 * 24
        ndate.setHours(9)
        ndate.setMinutes(15)
        var nwMilli = ndate.getTime()
        ndate = new Date(nwMilli + daych)
      }
      if (ndate.getHours() == 9 && ndate.getMinutes() < 15) {
        var daych = 1000 * 60 * 60 * 24
        ndate.setHours(9)
        ndate.setMinutes(15)
        var nwMilli = ndate.getTime()
        ndate = new Date(nwMilli - daych)
      }
    }
    if (ndate.getTime() >= endTime && !isNaN(new Date(endTime))) {
      ndate = new Date(endTime)
    }
    if (ndate.getTime() <= startTime && !isNaN(new Date(startTime))) {
      ndate = new Date(startTime)
    }

    console.log(ndate, date)
    var yr = ndate.getFullYear()
    var mnt = (ndate.getMonth() + 1).toString().padStart(2, '0')
    var date = ndate.getDate().toString().padStart(2, '0')
    var hr = ndate.getHours().toString().padStart(2, '0')
    var mn = ndate.getMinutes().toString().padStart(2, '0')
    newDate = `${yr}-${mnt}-${date}T${hr}:${mn}`

    setSelectedDate(newDate)
    timeDate.current.value = newDate
  }

  useEffect(() => {
    console.log('nochanged')
    timeDate.current.value = selectedDate
    if (isDragging == 0) fetchExpiryAndFutures()
  }, [selectedDate])

  useEffect(() => {
    if (isDragging == 0) fetchExpiryAndFutures()
  }, [isDragging])

  return (
    <div className="md-px-0 flex w-full flex-wrap items-center justify-center gap-4 py-0 px-4 md:pb-20 lg:flex-nowrap lg:items-start lg:justify-between lg:gap-12 lg:pb-0">
      {/* <div className="overflow-hidden rounded-lg bg-white shadow"> */}
      <div className="my-auto flex w-full flex-wrap items-center justify-center gap-4 lg:h-[140px] lg:flex-nowrap lg:justify-between">
        <div className="w-full transform rounded-xl border px-4 py-8 shadow-lg duration-300 ease-in-out hover:shadow-xl lg:h-[140px] lg:w-[300px]">
          <p className="pb-2">Select Option</p>
          <select
            id="Symbol"
            name="Symbol"
            autoComplete="country-name"
            ref={symbol}
            onChange={fetchExpiryAndFutures}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500  sm:text-sm"
          >
            <option>NIFTY</option>
            <option>BANKNIFTY</option>
            <option>FINNIFTY</option>
            // default='NIFTY'
          </select>
        </div>
        <div className="w-full transform rounded-xl border px-4 py-8 shadow-lg duration-300 ease-in-out hover:shadow-xl lg:h-[140px] lg:w-[500px]">
          <p>Audio Player</p>
          <AudioPlayer timeUpdate={timeUpdate} />
        </div>
        {/* <div className="p-6">
          <div className="space-y-2">
            <div className="relative">
              <div className="overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <div
                  className="h-2 w-1/2 bg-sky-500 dark:bg-sky-400"
                  role="progressbar"
                  aria-label="music progress"
                  aria-valuenow="1456"
                  aria-valuemin="0"
                  aria-valuemax="4550"
                ></div>
              </div>
              <div className="absolute left-1/2 top-1/2 -mt-2 -ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow ring-2 ring-sky-500 dark:ring-sky-400">
                <div className="h-1.5 w-1.5 rounded-full bg-sky-500 ring-1 ring-inset ring-slate-900/5 dark:bg-sky-400"></div>
              </div>
            </div>
            <div className="flex justify-between text-sm font-medium tabular-nums leading-6">
              <div className="text-sky-500 dark:text-slate-100">
                Days to expiry
              </div>
              <div className="text-slate-500 dark:text-slate-400">10 days</div>
            </div>
          </div>
        </div> */}
        {/* Your content */}
      </div>
      <div className="mt-[59px] flex h-[200px] w-full flex-wrap items-start justify-between gap-4 lg:flex-nowrap">
        <div className="flex w-full transform flex-col gap-3 rounded-xl border px-4 py-8 shadow-lg duration-300 ease-in-out hover:shadow-xl lg:h-[140px] 2xl:w-[400px]">
          <p>Rewind & Forward</p>
          <div className="flex w-full flex-none items-center gap-3 md:gap-8">
            <RewindButton player={timeUpdate} value="1d" />
            <RewindButton player={timeUpdate} value="5m" />
            <RewindButton player={timeUpdate} value="1m" />

            <ForwardButton player={timeUpdate} value="1m" />
            <ForwardButton player={timeUpdate} value="5m" />
            <ForwardButton player={timeUpdate} value="1d" />
          </div>
        </div>
        <div className="w-full transform rounded-xl border px-4 py-8 shadow-lg duration-300 ease-in-out hover:shadow-xl lg:h-[140px] 2xl:w-[400px]">
          <p className="pb-2">Select Data and Time</p>
          <div className="w-full">
            <input
              type="datetime-local"
              // value="2023-02-03"
              placeholder="yyyy-mm-dd"
              name="email"
              id="email"
              ref={timeDate}
              onChange={(e) => {
                if (
                  !isNaN(new Date(endTime)) &&
                  new Date(e.target.value).getTime() <= endTime &&
                  new Date(e.target.value).getTime() >= startTime
                ) {
                  setSelectedDate(e.target.value)
                  dateWarning.current.style.display = 'none'
                } else if (isNaN(new Date(endTime))) {
                  setSelectedDate(e.target.value)
                  dateWarning.current.style.display = 'none'
                } else {
                  dateWarning.current.style.display = 'block'
                }
              }}
              onBlur={(e) => {
                if (
                  !isNaN(new Date(endTime)) &&
                  (new Date(e.target.value).getTime() > endTime ||
                    new Date(e.target.value).getTime() < startTime)
                ) {
                  alert('Selected Date/Time outside Expiry date')
                  e.target.value = selectedDate
                  // return;
                } else {
                  setSelectedDate(e.target.value)
                }
                dateWarning.current.style.display = 'none'
              }}
              className="block w-full appearance-none rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
              defaultValue={selectedDate}
            />
            <label
              htmlFor="email"
              className="absolute ml-[3px] hidden text-xs text-red-500"
              ref={dateWarning}
            >
              Invadlid Date/Time
            </label>
          </div>
        </div>
        {/* </div> */}
        {/* <input type="datetime-local"  placeholder="yyyy-mm-dd"   /> */}
      </div>
    </div>
  )
}

export default UserInput
