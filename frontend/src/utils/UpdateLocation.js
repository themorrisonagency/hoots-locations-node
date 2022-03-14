import axios from "axios"
async function timeConversion(s) {
    const ampm = s.slice(-2).toUpperCase()
    const hours = Number(s.slice(0, 2))
    let time = s.slice(0, -2)
    if (ampm === "AM") {
      if (hours === 12) {
        // 12am edge-case
        return time.replace(s.slice(0, 2), "00").trim()
      }
      return time.trim()
    } else if (ampm === "PM") {
      if (hours !== 12) {
        return time.replace(s.slice(0, 2), String(hours + 12)).trim()
      }
      return time.trim() // 12pm edge-case
    }
    return "Error: AM/PM format is not valid"
  }
  
export default async function UpdateLocation(id, location) {
    const url = `http://localhost:4000/hooks/yext/${id}`
    let days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    let hoursObject = {}
    days.forEach(day => {
        let hours = (location[`${day}Open`] && location[`${day}Close`]) ? {openIntervals: [{ start: location[`${day}Open`], end: location[`${day}Close`] }]} : {isClosed: true}
        hoursObject[day] = hours
    })

    await Object.keys(hoursObject).map(async (day) => {
      if (hoursObject[day].openIntervals && hoursObject[day].openIntervals[0].start) {
        hoursObject[day].openIntervals[0].start = await timeConversion(hoursObject[day].openIntervals[0].start)
      }
    })
    await Object.keys(hoursObject).map(async (day) => {
      if (hoursObject[day].openIntervals && hoursObject[day].openIntervals[0].end) {
        hoursObject[day].openIntervals[0].end = await timeConversion(hoursObject[day].openIntervals[0].end)
      }
    })

    let deleteKeys = [
      "fridayClose",
      "fridayOpen",
      "line1",
      "mondayClose",
      "mondayOpen",
      "postalCode",
      "saturdayClose",
      "saturdayOpen",
      "state",
      "sundayClose",
      "sundayOpen",
      "thursdayClose",
      "thursdayOpen",
      "tuesdayClose",
      "tuesdayOpen",
      "wednesdayClose",
      "wednesdayOpen",
      "city",
      "visible",
      "comingSoon",
      "region"
    ]

    location.orderUrl = {
      url: location.orderUrl,
      preferDisplayUrl: false,
    }
    let obj = {
      address: {
        line1: location.line1,
        city: location.city,
        region: location.region,
        postalCode: location.postalCode,
      },
      hours: hoursObject,

      c_oloID: (location.c_oloID != null) ? location.c_oloID.toString() : "",
      ...location,
    }
    deleteKeys.forEach((key) => {
      delete obj[key]
    })
    const result = await axios.put(url, obj)
    return result
}