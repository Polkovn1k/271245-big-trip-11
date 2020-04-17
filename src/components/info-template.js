import {MONTH_NAMES} from '../const';

const generateTitle = (array) => {
  if (array.length === 1) {
    return array[0].destinationName;
  }
  if (array.length === 2) {
    return `${array[0].destinationName} — ${array[1].destinationName}`;
  }

  return `${array[0].destinationName} — ... — ${array[array.length - 1].destinationName}`;
};

const generateDates = (array) => {
  const startMonth = MONTH_NAMES[new Date(array[0].date.startDate).getMonth()];
  const endMonth = MONTH_NAMES[new Date(array[array.length - 1].date.endDate).getMonth()];
  const startDate = array[0].date.startDate.getDate();
  const endDate = array[array.length - 1].date.endDate.getDate();

  return (startMonth === endMonth) ? `${startMonth} ${startDate} — ${endDate}` : `${startDate} ${startMonth} — ${endDate} ${endMonth}`;
};

export const createInfoTemplate = (eventsArray) => {
  eventsArray = eventsArray
    .slice()
    .sort((a, b) => new Date(a.date.startDate) - new Date(b.date.startDate));

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${generateTitle(eventsArray)}</h1>
        <p class="trip-info__dates">${generateDates(eventsArray)}</p>
      </div>
    </section>`
  );
};
