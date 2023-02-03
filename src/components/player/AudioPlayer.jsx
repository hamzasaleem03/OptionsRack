import { useEffect, useRef, useState , useContext } from 'react'
import Link from 'next/link'

import { useAudioPlayer } from '@/components/AudioProvider'
import { ForwardButton } from '@/components/player/ForwardButton'
import { MuteButton } from '@/components/player/MuteButton'

import { RewindButton } from '@/components/player/RewindButton'
import { Slider } from '@/components/player/Slider'
import OpChainContext from '@/context/opChain-context'

function formatHumanDate(millisec){
  // console.log("hello-->",millisec)
  let date=new Date(millisec)
  return `${date.getDate} ${date.getMonth+1} ${date.getFullYear} ${date.getHours}:${date.getMinutes}`
}

export function AudioPlayer({timeUpdate}) {
  let player = useAudioPlayer()

  let wasPlayingRef = useRef(false)

  // let [currentTime, setCurrentTime] = useState(player.currentTime)
  let {currentTime, setCurrentTime,startTime,endTime,setTimePeriod,positionsList} =useContext(OpChainContext)

  useEffect(()=>{
    // var stDates=[],exDates=[]
    // initialOpTable.map((e)=>{
    //   // if(e.CE)
    // })
    // console.log("Updated")
    var enDate=[],exDate=[]
    // console.log(positionsList)
    positionsList.map(e=>{
      if(parseInt(e.exitPrice)==0){
        enDate.push(new Date(e.entryDate+'T'+e.entryTime).getTime());
        exDate.push(new Date(e.expiryDate+'T'+'15:29').getTime());
      }
    })
    // console.log("entries",enDate,exDate)
    setTimePeriod(Math.min.apply(null,enDate),Math.min.apply(null,exDate))
  },[positionsList])

  useEffect(() => {
    setCurrentTime(null)
  }, [player.currentTime])

  // setTimePeriod('2023-01-8T10:00','2023-01-12T10:30')
  // if (!player.meta) {
  //   return null
  // }


  return (
    <div className="flex items-start justify-start gap-2 -mt-3 ">
      <div className="hidden md:block">
      
      </div>
      <div className="mb-[env(safe-area-inset-bottom)] flex flex-1 flex-col gap-3 overflow-hidden p-1">
        {/* <Link
          href={player.meta.link}
          className="truncate text-center text-sm font-bold leading-6 md:text-left"
          title={player.meta.title}
        >
          {player.meta.title}
        </Link> */}
        <div className="flex justify-between gap-6">
          <div className="flex items-center md:hidden">
            <MuteButton player={player} />
          </div>
          
          <Slider
            label="Current time"
            maxValue={endTime-startTime+1}
            step={1}
            value={[currentTime ?? player.currentTime]}
            onChange={([v]) => setCurrentTime(v)}
            // onChangeEnd={(value) => {
            //   player.seek(value)
            // //   // if (wasPlayingRef.current) {
            // //   //   player.play()
            //   // }
            // }}
            numberFormatter={{ format: formatHumanDate }}
            // onChangeStart={() => {
            //   wasPlayingRef.current = player.playing
            //   player.pause()
            // }}
          />

{/* <div className="flex flex-col gap-3 border rounded-xl shadow-lg px-4 py-8 hover:shadow-xl ease-in-out transform duration-300 lg:h-[140px]">
      <p>Rewind & Forward</p>
      <div className='flex flex-none items-center md:gap-8 gap-3 w-full'>
            <RewindButton player={timeUpdate} value='1d' />
            <RewindButton player={timeUpdate} value='5m' />
            <RewindButton player={timeUpdate} value='1m' />

            <ForwardButton player={timeUpdate} value='1m'/>
            <ForwardButton player={timeUpdate} value='5m'/>
            <ForwardButton player={timeUpdate} value='1d'/>
      </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}
