const getRandomItemFromArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomItemsFromArray = (arr, quantity) => {
  const randomItems = arr.map(() => getRandomItemFromArray(arr)).slice(0, quantity);

  return removeDuplicatesFromArray(randomItems);
};

const getRandom = (max, min = 1) => {
  return Math.random() * (max - min) + min;
};

const getRandomInt = (max, min = 1) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const removeDuplicatesFromArray = (arr) => {
  return Array.from(new Set(arr));
};

const getRandomNumberFromInterval = (min, max, mult) => {
  return Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / mult) * mult;
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};


function timeDuration(start, end) {
  start = start.getTime();
  end = end.getTime();
  const diff = end - start;
  const days = new Date(end).getDay() - new Date(start).getDay();
  const hours = new Date(end).getHours() - new Date(start).getHours();
  const minutes = new Date(diff - (hours * (24 * 3600 * 1000))).getMinutes();
  const duration = {
    days: days > 0 ? `${castTimeFormat(days)}D ` : ``,
    hours: hours > 0 ? `${castTimeFormat(hours)}H ` : ``,
    minutes: minutes > 0 ? `${castTimeFormat(minutes)}M` : ``,
  };

  return `${duration.days}${duration.hours}${duration.minutes}`;
}

const checkEventType = (type, arr) => {
  const isActivityType = arr.some((item) => {
    return item === type;
  });

  return isActivityType ? `in` : `to`;
};

export {
  getRandomItemFromArray,
  getRandomItemsFromArray,
  getRandom,
  getRandomInt,
  removeDuplicatesFromArray,
  getRandomNumberFromInterval,
  castTimeFormat,
  formatTime,
  timeDuration,
  checkEventType
};
