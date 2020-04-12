import {getRandomItemFromArray, getRandomItemsFromArray, getRandomInt, getRandomNumberFromInterval} from '../utils';
import {EVENT_TYPE, EVENT_DESTINATION} from '../const';
import {tripEventOfferData} from './trip-event-offer-data';
import {generateTripEventDateData} from "./trip-event-date-data";

const randomPriceSettings = {
  MIN_PRICE: 1000,
  MAX_PRICE: 10000,
  MULTIPLE: 10,
};

const eventDestinationDescriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const tripEventItemSettings = {
  DESCRIPTION_MAX_ITEMS: 4,
  PHOTO_MAX_ITEMS: 5,
  getDescriptionQuantity() {
    return getRandomInt(this.DESCRIPTION_MAX_ITEMS);
  },
  getPhotoQuantity() {
    return getRandomInt(this.PHOTO_MAX_ITEMS);
  },
};

const generateTripEventItemData = () => {
  const type = getRandomItemFromArray(EVENT_TYPE);
  const date = generateTripEventDateData();
  const destinationName = getRandomItemFromArray(EVENT_DESTINATION);
  return {
    type,
    destinationName,
    price: getRandomNumberFromInterval(randomPriceSettings.MIN_PRICE, randomPriceSettings.MAX_PRICE, randomPriceSettings.MULTIPLE),
    startDate: new Date(date.startDateTimestamp),
    endDate: new Date(date.endDateTimestamp),
  };
};

const tripEventItemData = {

  /*offers: tripEventOfferData[eventType],*/
  destinationInfo: {
    description: getRandomItemsFromArray(eventDestinationDescriptions, tripEventItemSettings.getDescriptionQuantity()),
    photo: new Array(tripEventItemSettings.getPhotoQuantity())
      .fill(``)
      .map(() => `http://picsum.photos/248/152?r=${Math.random()}`),
  },
};

export {generateTripEventItemData};

