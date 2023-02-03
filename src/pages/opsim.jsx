import { useState } from 'react'
import { Header } from '@/components/Header'
import OptionChain from '@/views/tables/OptionChain'
import Futures from '@/views/tables/Futures'
import Positions from '@/views/tables/Positions'
import Payoff from '@/components/Payoff'
import UserInput from '@/views/UserInput'

import Stat from '@/views/Stat'
const tabs = [
  { name: 'Option chain', href: '#', current: true },
  { name: 'Futures', href: '#', current: false },
  { name: 'Positions', href: '#', current: false },
  { name: 'Greeks', href: '#', current: false },
]
const transactions = [
  {
    id: 'AAPS0L',
    company: 'Chase & Co.',
    share: 'CAC',
    commission: '+$4.37',
    price: '$3,509.00',
    quantity: '12.00',
    netAmount: '$4,397.00',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [currentTab, setCurrentTab] = useState('Option chain')

  return (
    <>
      <Header />
      <main>
        <div className="container relative mx-auto px-4 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-10 pb-20">
            {/* Stat */}
            <Stat />
            <UserInput />
            <div className="col-start-1 row-start-3 ">
              {/* Graph */}
              <Payoff />
            </div>
            <div className="row-start-4 lg:col-start-2 lg:row-start-3 row-span-3 bg-slate-100 p-6 lg:h-[420px] border rounded-xl shadow-lg  hover:shadow-xl ease-in-out transform duration-300 ">
              <div>
                <div className="sm:hidden">
                  <label htmlFor="tabs" className="sr-only">
                    Select a tab
                  </label>
                  {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                  <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                    defaultValue={tabs.find((tab) => tab.current).name}
                  >
                    {tabs.map((tab) => (
                      <option key={tab.name}>{tab.name}</option>
                    ))}
                  </select>
                </div>
                <div className="hidden sm:block">
                  <nav
                    className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
                    aria-label="Tabs"
                  >
                    {tabs.map((tab, tabIdx) => (
                      <a
                        key={tab.name}
                        // href={tab.href}
                        style={{ cursor: 'pointer' }}
                        className={classNames(
                          tab.name === currentTab
                            ? 'text-gray-900'
                            : 'text-gray-500 hover:text-gray-700',
                          tabIdx === 0 ? 'rounded-l-lg' : '',
                          tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                          'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10'
                        )}
                        onClick={() => {
                          setCurrentTab(tab.name)
                        }}
                        aria-current={tab.current ? 'page' : undefined}
                      >
                        <span>{tab.name}</span>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            tab.name === currentTab
                              ? 'bg-sky-500'
                              : 'bg-transparent',
                            'absolute inset-x-0 bottom-0 h-0.5'
                          )}
                        />
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="flex-1">
                {currentTab === 'Futures' && <Futures />}
                {currentTab === 'Option chain' && <OptionChain />}
                {currentTab === 'Positions' && <Positions />}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
    //////////////////////////Dashboard here
  )
}
