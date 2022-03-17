// NOTE: time string must look like this 07:05:45PM or this 07:05:45AM and account for 12:00:00AM and convert 12:00:00pm to 12:00:00
export function timeConversion(s: string) {
    const ampm = s.slice(-2).toUpperCase();
    const hours = Number(s.slice(0, 2));
    let time = s.slice(0, -2);
    if (ampm === 'AM') {
        if (hours === 12) { // 12am edge-case
            return time.replace(s.slice(0, 2), '00').toString().trim();
        }
        return time;
    } else if (ampm === 'PM') {
        if (hours !== 12) {
            return time.replace(s.slice(0, 2), String(hours + 12)).toString().trim();
        } 
        return time.trim(); // 12pm edge-case
    }
    return 'Error: AM/PM format is not valid';
}

  export async function Convert24HourTo12Hour(time: string){
    var date = new Date(`February 04, 2011 ${time}`);
    var options = {
      hour12: true
    };
    var timeString = date.toLocaleTimeString('en-US', options);
    if (timeString.length == 10){
      timeString = "0" + timeString
    }
    return timeString
  }
