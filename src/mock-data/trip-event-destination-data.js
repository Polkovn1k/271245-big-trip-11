import {getRandomItemsFromArray, getRandomInt} from '../utils';

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
  DESCRIPTION_AND_PHOTO_MAX_ITEMS: 5,
  getDescriptionQuantity() {
    return getRandomInt(this.DESCRIPTION_AND_PHOTO_MAX_ITEMS);
  },
  getPhotoQuantity() {
    return getRandomInt(this.DESCRIPTION_AND_PHOTO_MAX_ITEMS);
  },
};

const generateTripEventDestinationData = () => {
  const destinationDescription = getRandomItemsFromArray(eventDestinationDescriptions, tripEventItemSettings.getDescriptionQuantity());
  const destinationPhoto = new Array(tripEventItemSettings.getPhotoQuantity())
    .fill(``)
    .map(() => `http://picsum.photos/248/152?r=${Math.random()}`);
  return {
    destinationDescription,
    destinationPhoto,
  };
};

export {generateTripEventDestinationData};

