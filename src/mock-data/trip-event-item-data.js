import {getRandomItemFromArray, getRandomNumberFromInterval} from '../utils';
import {EVENT_TYPE, EVENT_DESTINATION, RANDOM_PRICE_SETTINGS} from '../const';
import {generateTripEventOfferData} from './trip-event-offer-data';
import {generateTripEventDateData} from "./trip-event-date-data";
import {generateTripEventDestinationData} from "./trip-event-destination-data";

const generateTripEventItemData = () => {
  const type = getRandomItemFromArray(EVENT_TYPE);
  const destinationName = getRandomItemFromArray(EVENT_DESTINATION);
  const offers = generateTripEventOfferData()[type];
  const destinationInfo = generateTripEventDestinationData();
  const price = getRandomNumberFromInterval(RANDOM_PRICE_SETTINGS.MIN_PRICE, RANDOM_PRICE_SETTINGS.MAX_PRICE, RANDOM_PRICE_SETTINGS.MULTIPLE);
  const date = generateTripEventDateData();
  return {
    type,
    destinationName,
    offers,
    destinationInfo,
    price,
    date,
  };
};

export {generateTripEventItemData};

