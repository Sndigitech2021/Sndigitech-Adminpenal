const { parseISO, format } = require('date-fns');
function DateFormate(date) {
   const newDate = parseISO(date);
   return format(newDate, 'MM/dd/yyyy, hh:mm:ss a');
}

export default DateFormate