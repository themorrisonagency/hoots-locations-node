import React from "react"


export const StoreHours = (hours) => {
  let storeHours = JSON.parse(hours)

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
