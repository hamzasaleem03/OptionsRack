import { createContext, useState } from 'react'

const OpChainContext = createContext({
  expiryList: [],
  initialOpTable: [],
  userInput: {},
  optionalChainListTemp: [],
  futuresList: [],
  positionsList: [],
  setExpiryList: () => {},
  setInitialOpTable: () => {},
  setOptionChainListTemp: () => {},
  setFuturesList: () => {},
  setPositionsList: () => {},
})

export const OpChainContextProvider = ({ children }) => {
  const [expiryList, setExpiryList] = useState([])
  const [initialOpTable, setInitialOpTable] = useState([])
  const [optionalChainListTemp, setOptionChainListTemp] = useState([])
  const [futuresList, setFuturesList] = useState([])
  const [positionsList, setPositionsList] = useState([])
  const updateExpiryList = (newList) => {
    setExpiryList(newList)
  }
  const [userInput, setUserInput] = useState({})
  const [startTime,setStartTime]=useState(null)
  const [currentTime,setCurrentTime]=useState(null)
  const [endTime,setEndTime]=useState(null)
  const setTimePeriod=(st,ed)=>{
    setStartTime(st);
    setEndTime(ed);
  }
  const [selectedDate,setSelectedDate]=useState(null)
  const [isDragging,setIsDragging]=useState(0)


  return (
    <OpChainContext.Provider
      value={{
        expiryList,
        updateExpiryList,
        initialOpTable,
        setInitialOpTable,
        userInput,
        setUserInput,
        optionalChainListTemp,
        setOptionChainListTemp,
        futuresList,
        setFuturesList,
        positionsList,
        setPositionsList,
        startTime,
        endTime,
        setTimePeriod,
        currentTime,
        setCurrentTime,
        selectedDate,
        setSelectedDate,
        isDragging,
        setIsDragging,
      }}
    >
      {children}
    </OpChainContext.Provider>
  )
}

export default OpChainContext
