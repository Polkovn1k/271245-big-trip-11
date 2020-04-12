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

export {getRandomItemFromArray, getRandomItemsFromArray, getRandom, getRandomInt, removeDuplicatesFromArray, getRandomNumberFromInterval};
