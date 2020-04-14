import {createInfoTemplate} from './components/info-template';
import {createCostTemplate} from './components/cost-template';
import {createMenuTemplate} from './components/menu-template';
import {createFilterTemplate} from './components/filter-template';
import {createSortTemplate} from './components/sort-template';
import {createEventEditTemplate} from './components/event-edit-template';
import {createTripDaysListTemplate} from './components/trip-days-list-template';
import {createTripDaysItemTemplate} from './components/trip-days-item-template';
import {createTripEventsListTemplate} from './components/trip-events-list-template';
import {createTripEventItemTemplate} from './components/trip-event-item-template';
import {generateTripEventItemData} from "./mock-data/trip-event-item-data";

const TRIP_EVENT_ITEM_QUANTITY = 20;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripEventItems = new Array(TRIP_EVENT_ITEM_QUANTITY).
fill(``)
  .map(() => generateTripEventItemData());

const tripMainElement = document.querySelector(`.trip-main`);
render(tripMainElement, createInfoTemplate(), `afterBegin`);

const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);
render(tripInfoElement, createCostTemplate(), `beforeEnd`);

const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripControlsTitleElement = tripMainElement.querySelector(`.trip-main__trip-controls h2:first-child`);
render(tripControlsElement, createFilterTemplate(), `beforeEnd`);
render(tripControlsTitleElement, createMenuTemplate(), `afterEnd`);

const tripEventsElement = document.querySelector(`.trip-events`);
const tripEventsTitleElement = tripEventsElement.querySelector(`.trip-events h2:first-child`);
render(tripEventsTitleElement, createSortTemplate(), `afterEnd`);
render(tripEventsElement, createEventEditTemplate(), `beforeEnd`);
render(tripEventsElement, createTripDaysListTemplate(), `beforeEnd`);

const tripDaysList = tripEventsElement.querySelector(`.trip-days`);
render(tripDaysList, createTripDaysItemTemplate(tripEventItems[0]), `afterBegin`);

const tripDaysItem = tripDaysList.querySelector(`.trip-days__item`);
render(tripDaysItem, createTripEventsListTemplate(), `beforeEnd`);

const tripEventsList = tripDaysItem.querySelector(`.trip-events__list`);
new Array(TRIP_EVENT_ITEM_QUANTITY)
  .fill(``)
  .forEach((item, i) => {
    render(tripEventsList, createTripEventItemTemplate(tripEventItems[i]), `beforeEnd`);
  });

console.dir(tripEventItems);

