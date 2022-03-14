import { OpeningHours, WeekDays } from '@phoenix344/opening-hours';


export default async function ShowOpenHours(hours, timezone) {
    
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


    Object.keys(hours).forEach((day) => {

        if(!hours[day].isClosed){
            let weekday: any = WeekDays[capitalize(day)];
            oh.add(weekday, hours[day].openIntervals[0].start, hours[day].openIntervals[0].end)

        }
    })

    const currentHour = oh.toLocaleJSON().find(day => day.active === true)

    if (oh.getState() === 1){
        return `Open - Closing at ${currentHour?.times[0].until}`
    } else {
        // Check opening hours in stores time zone vs current time.
        let fromTime = currentHour?.times[0].from || Date.now()
        if(new Date().toLocaleTimeString("en-US", {timeZone: timezone}) > new Date(fromTime).toLocaleTimeString("en-US", {timeZone: timezone})){
            return `Closed - Opening tomorrow at ${oh.toLocaleJSON()[1].times[0].from}`
        }
        return `Closed - Opening at ${currentHour?.times[0].from}`
    }
    return 'Check store page'

}

function capitalize(day: any) {
    return day.split('')[0].toUpperCase() + day.split('').slice(1).join('')
}