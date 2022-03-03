export default async function Convert24HourTo12(time){
    var date = new Date(`February 04, 2011 ${time}`);
    var options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    var timeString = date.toLocaleString('en-US', options);
    return timeString
  }