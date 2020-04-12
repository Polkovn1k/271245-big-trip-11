import {getRandomItemFromArray, getRandomInt, getRandomNumberFromInterval} from '../utils';

const MAX_TITLE_ITEMS = 5;

const eventOfferTitle = [
  `Choose the radio station`,
  `Choose temperature`,
  `Drive slowly`,
  `Drive quickly, I'm in a hurry`,
  `Upgrade to a business class`,
  `Choose business class`,
  `Choose comfort class`,
  `Wake up at a certain time`,
  `Order a breakfast`,
  `Book a taxi at the arrival point`,
  `Choose live music`,
  `Choose VIP area`,
  `Business lounge`,
  `Choose seats`,
  `Add luggage`,
];

const tripEventOfferData = {
  'Taxi': null,
  'Bus': null,
  'Train': null,
  'Ship': null,
  'Transport': null,
  'Drive': null,
  'Flight': null,
  'Check-in': null,
  'Sightseeng': null,
  'Restaurant': null,
};

const randomPriceSettings = {
  MIN_PRICE: 100,
  MAX_PRICE: 10000,
  MULTIPLE: 10,
};

const getOffersArray = (arrayLength) => {
  return new Array(arrayLength)
    .fill(``)
    .map(() => {
      return {
        title: getRandomItemFromArray(eventOfferTitle),
        price: getRandomNumberFromInterval(randomPriceSettings.MIN_PRICE, randomPriceSettings.MAX_PRICE, randomPriceSettings.MULTIPLE),
      };
    });
};

function setTripEventOfferData() {
  for (const item in tripEventOfferData) {
    if (tripEventOfferData.hasOwnProperty(item)) {
      const arrayLength = getRandomInt(MAX_TITLE_ITEMS);
      tripEventOfferData[item] = getOffersArray(arrayLength);
    }
  }
}

setTripEventOfferData();

export {tripEventOfferData};
