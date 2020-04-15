import {MONTH_NAMES} from '../const';

export const createTripDaysItemTemplate = (obj) => {
  const {date} = obj;
  const month = MONTH_NAMES[date.startDate.getMonth()];
  const dateNum = date.startDate.getDate();
  const dateTime = `${date.startDate.getFullYear()}-${date.startDate.getMonth()}-${date.startDate.getDay()}`;
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">1</span>
        <time class="day__date" datetime="${dateTime}">${month} ${dateNum}</time>
      </div>
    </li>`
  );
};
