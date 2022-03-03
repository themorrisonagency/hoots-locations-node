import {timeConversion} from "./timeConversion"

type dbHoursObj = {
  monOpen: string
  monClose: string
  tueOpen: string
  tueClose: string
  wedOpen: string
  wedClose: string
  thuOpen: string
  thuClose: string
  friOpen: string
  friClose: string
  satOpen: string
  satClose: string
  sunOpen: string
  sunClose: string
}
export default async function convertDbHoursToYext(obj: dbHoursObj) {
  return await {
    hours: {
      monday: {
        openIntervals: [
          {
            start: await timeConversion(obj.monOpen),
            end: await timeConversion(obj.monClose),
          },
        ],
      },
      tuesday: {
        openIntervals: [
          {
            start: await timeConversion(obj.tueOpen),
            end: await timeConversion(obj.tueClose),
          },
        ],
      },
      wednesday: {
        openIntervals: [
          {
            start: await timeConversion(obj.wedOpen),
            end: await timeConversion(obj.wedClose),
          },
        ],
      },
      thursday: {
        openIntervals: [
          {
            start: await timeConversion(obj.thuOpen),
            end: await timeConversion(obj.thuClose),
          },
        ],
      },
      friday: {
        openIntervals: [
          {
            start: await timeConversion(obj.friOpen),
            end: await timeConversion(obj.friClose),
          },
        ],
      },
      saturday: {
        openIntervals: [
          {
            start: await timeConversion(obj.satOpen),
            end: await timeConversion(obj.satClose),
          },
        ],
      },
      sunday: {
        openIntervals: [
          {
            start: await timeConversion(obj.sunOpen),
            end: await timeConversion(obj.sunClose),
          },
        ],
      },
    },
  }
}
