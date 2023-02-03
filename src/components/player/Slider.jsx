import { useContext, useEffect, useRef ,useState } from 'react'
import {
  mergeProps,
  useFocusRing,
  useSlider,
  useSliderThumb,
  VisuallyHidden,
} from 'react-aria'
import { useSliderState } from 'react-stately'
import clsx from 'clsx'
import OpChainContext from '@/context/opChain-context'

function formatHumanDate(millisec,side){
  let date=new Date(millisec)
  // console.log(millisec)
  if(isNaN(date))return "Click The Bar"
  else {
    let showDate= date.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
    // if(side==='left')setSelectedDate(showDate)
    
    return showDate;
  }
}


function Thumb(props) {
  let { state, trackRef, focusProps, isFocusVisible, index ,thumbRef } = props
  let inputRef = useRef(null)
  let { thumbProps, inputProps } = useSliderThumb(
    { index, trackRef, inputRef },
    state
  )
  
  return (
    <div
      className="absolute top-1/2 -translate-x-1/2"
      style={{
        left: `${state.getThumbPercent(index) * 100}%`,
      }}
      ref={thumbRef}
    >
      <div
        {...thumbProps}
        onMouseDown={(...args) => {
          thumbProps.onMouseDown(...args)
          props.onChangeStart?.()
        }}
        onPointerDown={(...args) => {
          thumbProps.onPointerDown(...args)
          props.onChangeStart?.()
        }}
        className={clsx(
          'h-4 rounded-full',
          isFocusVisible || state.isThumbDragging(index)
            ? 'w-1.5 bg-slate-900'
            : 'w-1 bg-slate-700'
        )}
      >
        <VisuallyHidden>
          <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
        </VisuallyHidden>
      </div>
    </div>
  )
}

export function Slider(props) {
  let trackRef = useRef(null)
  let state = useSliderState(props)
  let { groupProps, trackProps, labelProps, outputProps } = useSlider(
    props,
    state,
    trackRef
  )
  let { focusProps, isFocusVisible } = useFocusRing()
  let currentTime = state.getThumbValue(0)
  let totalTime = state.getThumbMaxValue(0)
  let barLength=useRef(null);
  let thumbRef=useRef(null);
  let {startTime,selectedDate,setSelectedDate,endTime,positionsList,setIsDragging} =useContext(OpChainContext);

  // if(state.isThumbDragging(0)){
  //   setSelectedDate(new Date(startTime+currentTime));
  // }
  useEffect(()=>{
    var date=new Date(currentTime+startTime)
    if(isNaN(date))return;
    var yr=date.getFullYear();
    var mnt=(date.getMonth()+1).toString().padStart(2,'0');
    var d=date.getDate().toString().padStart(2,'0');
    var hr=date.getHours().toString().padStart(2,'0');
    var mn=date.getMinutes().toString().padStart(2,'0');
    var newDate=`${yr}-${mnt}-${d}T${hr}:${mn}`
    setSelectedDate(newDate)
  },[currentTime])

  useEffect(()=>{
    if(!isNaN(new Date(startTime)) && state.isThumbDragging(0)==0){
      console.log("Why")
      state.setThumbValue(0,new Date(selectedDate).getTime() - startTime);
    }
  },[selectedDate])

  useEffect(()=>{
    if(isNaN(new Date(endTime))){  
      // barLength.current.style.width=0
      thumbRef.current.style.left=0;

      // currentTime=startTime;
    }
    state.setThumbValue(0,0)
    state.setThumbPercent(0,0)
    // console.log("changed=",endTime,currentTime)
  },[startTime,endTime])

  useEffect(()=>{
    setIsDragging(state.isThumbDragging(0));  
  },[state.isThumbDragging(0)])


  return (
    <div
      {...groupProps}
      className="absolute top-4 md:top-0 inset-x-4 md:inset-0 bottom-full flex flex-auto touch-none items-center gap-6 md:relative"
    >
      {props.label && (
        <label className="sr-only" {...labelProps}>
          {props.label}
        </label>
      )}
      <div
        {...trackProps}
        onMouseDown={(...args) => {
          trackProps.onMouseDown(...args)
          props.onChangeStart?.()
        }}
        onPointerDown={(...args) => {
          trackProps.onPointerDown(...args)
          props.onChangeStart?.()
        }}
        ref={trackRef}
        className="relative w-full bg-slate-100 md:rounded-full"
      >
        <div
          className={clsx(
            'h-2 md:rounded-r-md md:rounded-l-xl bg-slate-700',
            isNaN(new Date(endTime)) && 'opacity-0',
            isFocusVisible || state.isThumbDragging(0)
              ? 'bg-slate-900'
              : 'bg-slate-700'
          )}
          style={{
            width:
              state.getThumbValue(0) === 0
                ? 0
                : `calc(${state.getThumbPercent(0) * 100}% - ${
                    isFocusVisible || state.isThumbDragging(0)
                      ? '0.3125rem'
                      : '0.25rem'
                  })`,
          }}
          ref={barLength}
        />
        <Thumb
          index={0}
          state={state}
          thumbRef={thumbRef}
          trackRef={trackRef}
          onChangeStart={props.onChangeStart}
          focusProps={focusProps}
          isFocusVisible={isFocusVisible}
        />
      </div>
      {(!isNaN(new Date(endTime))) && <div className='absolute left-10 top-0 text-slate-400 font-mono text-sm md:hidden'>No Positions Are Selected</div>}
      <div className="hidden items-center gap-1 md:flex h-20">
        { (!isNaN(new Date(endTime)))?
        <>
          <output
            {...outputProps}
            aria-live="off"
            className={clsx(
              'hidden rounded-md px-1 py-0.5 font-mono text-sm leading-6 md:block',
              state.getThumbMaxValue(0) === 0 && 'opacity-0',
              isFocusVisible || state.isThumbDragging(0)
              ? 'bg-slate-100 text-slate-900'
              : 'text-slate-500'
              )}
              >
            {/* {formatTime(currentTime, totalTime)} */}
            {formatHumanDate(startTime+currentTime,"left")}
          </output>
          <span className="text-sm leading-6 text-slate-300" aria-hidden="true">
            /
          </span>
          <span
            className={clsx(
              'hidden rounded-md px-1 py-0.5 font-mono text-sm leading-6 text-slate-500 md:block',
              state.getThumbMaxValue(0) === 0 && 'opacity-0'
              )}
              >
            {formatHumanDate(endTime,"right")}
          </span>
        </>
        :
        <p className={clsx(
          'rounded-md px-1 py-0.5 font-mono text-sm leading-6 md:block',
          state.getThumbMaxValue(0) === 0 && 'opacity-0',
          isFocusVisible || state.isThumbDragging(0)
          ? 'bg-slate-100 text-slate-900'
          : 'text-slate-500'
          )}>
            {
              (positionsList.length==0)
              ?"No Positions are Created"
              :"No Open Positions"

            }
          </p>
        }
      </div>
    </div>
  )
}
