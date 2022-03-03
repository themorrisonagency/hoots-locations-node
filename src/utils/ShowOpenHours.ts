import { OpeningHours, WeekDays } from '@phoenix344/opening-hours';

type OpenHoursType = {
    start: string
    end: string
    day: string[]
}


export default async function ShowOpenHours(hours: OpenHoursType, timezone: string): Promise<any> {
    
    // let hoursContainer = []
    const oh = new OpeningHours({
        
        // Predefine a date makes only sense to test the current day
        // currentDate: new Date(2020, 8, 15),
        currentDayOnTop: true,
        locales: "en-US",
        dateTimeFormatOptions: {
            timeZone: timezone, hour: "2-digit"
        }
    });


    Object.keys(hours).forEach(day => {
        if(!hours[day].isClosed){
            oh.add(WeekDays[capitalize(day)], hours[day].openIntervals[0].start, hours[day].openIntervals[0].end)

        }
    })


    // let str = ""
    // (state === 1) ? str = `Open closing at `
    const currentHour = oh.toLocaleJSON().find(day => day.active === true)
    if (oh.getState === 1){
        return `Open - Closing at ${oh.currentDate}`
    } else {
        if(new Date().toLocaleTimeString("en-US", {timeZone: timezone}) > currentHour.times[0].from){
            return `Closed - Opening tomorrow at ${oh.toLocaleJSON()[1].times[0].from}`
        }
        return `Closed - Opening at ${currentHour.times[0].from}`
    }
    return 'Check store page'

}

function capitalize(day) {
    return day.split('')[0].toUpperCase() + day.split('').slice(1).join('')
}