module.exports = {
  getLastDay(year, month) {
    const lastDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const isLeap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)

    if (isLeap && month === 2) {
      return 29
    } else {
      return lastDays[month - 1]
    }
  }
}
