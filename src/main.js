import {RENDER_POSITION} from './const';
import {render} from './utils';
import {Info} from './components/info-component';
import {Cost} from './components/cost-component';
import {Menu} from './components/menu-component';
import {Filter} from './components/filter-component';
import {Sort} from './components/sort-component';
import {TripEventItem} from './components/trip-event-item-component';
import {TripEventEditItem} from './components/event-edit-component';
import {TripDaysList} from './components/trip-days-list-component';
import {TripDaysItem} from './components/trip-days-item-component';
import {TripEventList} from './components/trip-events-list-component';
import {generateTripEventsData} from "./mock-data/trip-event-item-data";
import {generateTripDays, getTripDaysString} from "./mock-data/trip-event-date-data";

const TRIP_EVENT_ITEM_QUANTITY = 20;

const tripEventItems = generateTripEventsData(TRIP_EVENT_ITEM_QUANTITY);
const tripDays = generateTripDays(tripEventItems);

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, new Info(tripEventItems).getElement(), RENDER_POSITION.AFTERBEGIN);

const tripMainInfo = tripMain.querySelector(`.trip-main__trip-info`);
render(tripMainInfo, new Cost().getElement(), RENDER_POSITION.BEFOREEND);

const tripMainControls = tripMain.querySelector(`.trip-main__trip-controls`);
const tripMainControlsTitle = tripMain.querySelector(`.trip-main__trip-controls h2:first-child`);
render(tripMainControls, new Filter().getElement(), RENDER_POSITION.BEFOREEND);
render(tripMainControlsTitle, new Menu().getElement(), RENDER_POSITION.AFTEREND);

const tripEvents = document.querySelector(`.trip-events`);
const tripEventsTitle = tripEvents.querySelector(`.trip-events h2:first-child`);
render(tripEventsTitle, new TripDaysList().getElement(), RENDER_POSITION.AFTEREND);
render(tripEventsTitle, new Sort().getElement(), RENDER_POSITION.AFTEREND);

const tripDaysList = tripEvents.querySelector(`.trip-days`);
Array.from(tripDays)
  .forEach((item, i) => {
    render(tripDaysList, new TripDaysItem(item, i + 1).getElement(), RENDER_POSITION.BEFOREEND);
  });

const renderEvent = (eventsContainer, data) => {
  const tripEventItem = new TripEventItem(data);
  const tripEventEditItem = new TripEventEditItem(data);
  const tripEventItemRollupBtn = tripEventItem.getElement().querySelector(`.event__rollup-btn`);
  const tripEventEditForm = tripEventEditItem.getElement();

  const onRollupBtnClick = () => {
    eventsContainer.replaceChild(tripEventEditItem.getElement(), tripEventItem.getElement());
  };

  const onEventEditSubmit = (evt) => {
    evt.preventDefault();
    eventsContainer.replaceChild(tripEventItem.getElement(), tripEventEditItem.getElement());
  };

  tripEventItemRollupBtn.addEventListener(`click`, onRollupBtnClick);
  tripEventEditForm.addEventListener(`submit`, onEventEditSubmit);

  render(eventsContainer, tripEventItem.getElement(), RENDER_POSITION.BEFOREEND);
};

const tripDaysItem = tripDaysList.querySelectorAll(`.trip-days__item`);
tripDaysItem.forEach((item) => {
  render(item, new TripEventList().getElement(), RENDER_POSITION.BEFOREEND);
  const tripEventsList = item.querySelector(`.trip-events__list`);

  tripEventItems
    .slice()
    .sort((a, b) => new Date(a.date.startDate) - new Date(b.date.startDate))
    .filter((eventItem) => getTripDaysString(eventItem) === tripDays[0])
    .forEach((currentDayEvent) => {
      renderEvent(tripEventsList, currentDayEvent);
    });
  tripDays.shift();
});

console.dir(tripEventItems);
