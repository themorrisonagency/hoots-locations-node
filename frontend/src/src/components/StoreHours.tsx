import React from "react"

interface StoreHoursString {
  hours: string
}

interface StoreHoursProps {
    monday: DayProp
    tuesday: DayProp
    wednesday: DayProp
    thursday: DayProp
    friday: DayProp
    saturday: DayProp
    sunday: DayProp
}
interface OpenIntervals {
    start: string
    end: string
}
interface DayProp {
    isClosed?: boolean
    openIntervals: OpenIntervals[]
}

export const StoreHours: React.FC<StoreHoursString> = ({ hours }) => {
  let storeHours: StoreHoursProps[] = JSON.parse(hours)

  return (
    <>
      {Object.keys(storeHours).map((day) => (
        <span key={storeHours[day]}>
          {day}<br/>{!storeHours[day].isClosed ? "Open " + storeHours[day].openIntervals[0].start : "closed"} - {!storeHours[day].isClosed ? "Close " + storeHours[day].openIntervals[0].end : ""}
        </span>
      ))}
    </>
  )
}
