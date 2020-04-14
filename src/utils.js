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
  let delta = Math.floor((end - start) / 1000);
  const days = Math.floor(delta / 86400);
  delta -= days * 86400;
  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;
  const minutes = Math.floor(delta / 60) % 60;
  const duration = {
    days: days ? `${castTimeFormat(days)}D ` : ``,
    hours: hours ? `${castTimeFormat(hours)}H ` : ``,
    minutes: minutes ? `${castTimeFormat(minutes)}M` : ``,
  };
  return `${duration.days}${duration.hours}${duration.minutes}`;
}

export {getRandomItemFromArray, getRandomItemsFromArray, getRandom, getRandomInt, removeDuplicatesFromArray, getRandomNumberFromInterval, formatTime, timeDuration};
