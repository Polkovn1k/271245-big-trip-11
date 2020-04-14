import {MONTH_NAMES} from '../const';

export const createTripDaysItemTemplate = (obj) => {
  const {date} = obj;
  const month = MONTH_NAMES[date.startDate.getMonth()];
  const dateNum = date.startDate.getDate();
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">1</span>
        <time class="day__date" datetime="2019-03-18">${month} ${dateNum}</time>
      </div>
    </li>`
  );
};
