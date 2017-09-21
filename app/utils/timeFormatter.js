export const timeFormatter = (time) => {
  const hours = time.hours,
        minutes = time.minutes,
        hasTime = (time.hours != 0 || time.minutes != 0),
        hourString = hours > 0 ?
          (hours == 1 ? hours + ' hr ' : hours + ' hrs ') : '',
        minuteString = minutes > 0 ?
          (minutes == 1 ? minutes + ' min ' : minutes + ' mins ') : ''

  return {
    hours: hourString,
    minutes: minuteString,
    hasTime
  }
}
