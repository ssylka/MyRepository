export function parseTimeSlot(timeSlot) {
  const [weekDay, beginTime, endTime, week] = timeSlot.slice(1, -1).split(',');

  return {
    weekDay,
    beginTime: beginTime.slice(0, 5),
    endTime: endTime.slice(0, 5),
    week,
  };
}


export function parseCTime(cTime) {
  const hours = String(cTime.hours || '').padStart(2, '0');
  const minutes = String(cTime.minutes || '').padStart(2, '0');

  return `${hours}:${minutes}`;
}
