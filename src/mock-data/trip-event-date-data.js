import {getRandom} from '../utils';

const dateSettings = {
  MAX_INTERVAL_FOR_START_DAY: 15,
  MIN_INTERVAL_FOR_END_DAY: 0.1,
  MAX_INTERVAL_FOR_END_DAY: 0.2,
  ONE_DAY_ON_MILLISECONDS: 24 * 3600 * 1000,
};

const getStartDate = () => {
  return Date.now() + (getRandom(dateSettings.MAX_INTERVAL_FOR_START_DAY) * dateSettings.ONE_DAY_ON_MILLISECONDS);
};

const getEndDate = (startDateValue) => {
  return startDateValue + (getRandom(dateSettings.MAX_INTERVAL_FOR_END_DAY, dateSettings.MIN_INTERVAL_FOR_END_DAY) * dateSettings.ONE_DAY_ON_MILLISECONDS);
};

const generateTripEventDateData = () => {
  const startDate = getStartDate();
  return {
    startDate: new Date(startDate),
    endDate: new Date(getEndDate(startDate)),
  };
};

const generateTripDays = (eventArr) => {
  return new Set(eventArr.map((item) => `${item.date.startDate.getFullYear()}-${item.date.startDate.getMonth()}-${item.date.startDate.getDay()}`));
};

export {generateTripEventDateData, generateTripDays};
