const DateUtils = {
    addDays(date, count) {
        let time = date.setDate(date.getDate() + count);
        return new Date(time);
    }
}

export default DateUtils
