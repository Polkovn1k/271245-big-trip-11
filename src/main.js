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
import {generateTripEventsData} from "./mock-data/trip-event-item-data";
import {generateTripDays, getTripDaysString} from "./mock-data/trip-event-date-data";

const TRIP_EVENT_ITEM_QUANTITY = 20;

const tripEventItems = generateTripEventsData(TRIP_EVENT_ITEM_QUANTITY);
const tripDays = generateTripDays(tripEventItems);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

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
Array.from(tripDays)
  .forEach((item, i) => {
    render(tripDaysList, createTripDaysItemTemplate(item, ++i), `beforeEnd`);
  });

const tripDaysItem = tripDaysList.querySelectorAll(`.trip-days__item`);
tripDaysItem.forEach((item) => {
  render(item, createTripEventsListTemplate(), `beforeEnd`);
  const tripEventsList = item.querySelector(`.trip-events__list`);
  tripEventItems
    .filter((eventItem) => {
      return getTripDaysString(eventItem) === tripDays[0];
    })
    .forEach((dayEvent) => {
      render(tripEventsList, createTripEventItemTemplate(dayEvent), `beforeEnd`);
    });
  tripDays.shift();
});

console.dir(tripEventItems);
