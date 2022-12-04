import moment from 'moment';


export function fromNum(num) {
  switch (Number(num)) {
    case 0:
      return 'upper';

    case 1:
      return 'lower';

    default:
      throw new Error('Bad week');
  }
}

export function buildDate(week) {
  const now = moment();

  switch (week) {
    case 'upper':
      break;

    case 'lower':
      now.subtract(1, 'weeks');
      break;

    default:
      throw new Error('Bad week');
  }

  return {
    day: now.date(),
    month: now.month() + 1,
    year: now.year(),
  };
}
