const TRANSFER_TYPE = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
];
const ACTIVITY_TYPE = [
  `check-in`,
  `sightseeing`,
  `restaurant`
];
const EVENT_DESTINATION = [
  `Chamonix`,
  `Geneva`,
  `Amsterdam`,
  `Helsinki`,
  `Oslo`,
  `Kopenhagen`,
  `Den Haag`,
  `Rotterdam`,
  `Saint Petersburg`,
  `Moscow`,
  `Sochi`,
  `Tokio`,
  `Kioto`,
  `Nagasaki`,
  `Hiroshima`,
  `Berlin`,
  `Munich`,
  `Frankfurt`,
  `Vien`,
  `Rome`,
  `Naples`,
  `Venice`,
  `Milan`,
  `Monaco`,
  `Paris`,
  `Barcelona`,
  `Valencia`,
  `Madrid`
];
const MONTH_NAMES = [
  `JAN`,
  `FEB`,
  `MAR`,
  `APR`,
  `MAY`,
  `JUN`,
  `JUL`,
  `AUG`,
  `SEP`,
  `OCT`,
  `NOV`,
  `DEC`,
];

const SortTypeTitle = {
  EVENT: `sort-event`,
  TIME: `sort-time`,
  PRICE: `sort-price`,
};

const RandomPriceSettings = {
  MIN_PRICE: 1000,
  MAX_PRICE: 10000,
  MULTIPLE: 10,
};

export {TRANSFER_TYPE, ACTIVITY_TYPE, EVENT_DESTINATION, MONTH_NAMES, RandomPriceSettings, SortTypeTitle};
