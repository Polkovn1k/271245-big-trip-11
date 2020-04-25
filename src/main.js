import {RENDER_POSITION, render, replace} from './utils/render';
import {InfoContainer} from './components/info-container-component';
import {MainInfo} from './components/main-info-component';
import {Cost} from './components/cost-component';
import {Menu} from './components/menu-component';
import {Filter} from './components/filter-component';
import {Sort} from './components/sort-component';
import {TripEventItem} from './components/trip-event-item-component';
import {TripEventEditItem} from './components/event-edit-component';
import {TripDaysList} from './components/trip-days-list-component';
import {TripDaysItem} from './components/trip-days-item-component';
import {TripEventList} from './components/trip-events-list-component';
import {NoPoints} from './components/no-points-component';
import {generateTripEventsData} from "./mock-data/trip-event-item-data";
import {generateTripDays, getTripDaysString} from "./mock-data/trip-event-date-data";

const TRIP_EVENT_ITEM_QUANTITY = 20;
const tripMain = document.querySelector(`.trip-main`);
const tripEvents = document.querySelector(`.trip-events`);
const tripEventsTitle = tripEvents.querySelector(`.trip-events h2:first-child`);

const renderInfo = (infoData) => {
  const infoContainer = new InfoContainer();
  render(tripMain, infoContainer, RENDER_POSITION.AFTERBEGIN);
  render(infoContainer.getElement(), new Cost(), RENDER_POSITION.BEFOREEND);
  if (infoData.length) {
    render(tripMain, new MainInfo(infoData), RENDER_POSITION.AFTERBEGIN);
  }
};

const renderTripMainControls = () => {
  const tripMainControls = tripMain.querySelector(`.trip-main__trip-controls`);
  const tripMainControlsTitle = tripMain.querySelector(`.trip-main__trip-controls h2:first-child`);

  render(tripMainControls, new Filter(), RENDER_POSITION.BEFOREEND);
  render(tripMainControlsTitle, new Menu(), RENDER_POSITION.AFTEREND);
};

const renderTripDays = (tripDays) => {
  const tripDaysList = new TripDaysList();
  render(tripEventsTitle, tripDaysList, RENDER_POSITION.AFTEREND);

  Array.from(tripDays)
    .forEach((item, i) => {
      render(tripDaysList.getElement(), new TripDaysItem(item, i + 1), RENDER_POSITION.BEFOREEND);
    });
};

const renderTripEventItems = (tripDays) => {
  const tripDaysItem = tripEvents.querySelectorAll(`.trip-days__item`);
  tripDaysItem.forEach((item) => {
    render(item, new TripEventList(), RENDER_POSITION.BEFOREEND);
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
};

const renderEvent = (eventsContainer, data) => {
  const tripEventItem = new TripEventItem(data);
  const tripEventEditItem = new TripEventEditItem(data);
  const tripEventItemRollupBtn = tripEventItem.getElement().querySelector(`.event__rollup-btn`);
  const tripEventEditForm = tripEventEditItem.getElement();

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replace(tripEventItem, tripEventEditItem);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  tripEventItemRollupBtn.addEventListener(`click`, () => {
    replace(tripEventEditItem, tripEventItem);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  tripEventEditForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replace(tripEventItem, tripEventEditItem);
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventsContainer, tripEventItem, RENDER_POSITION.BEFOREEND);
};

const renderMainContent = (data) => {
  const tripDays = generateTripDays(data);

  renderTripMainControls();
  renderInfo(data);

  if (!tripEventItems.length) {
    render(tripEventsTitle, new NoPoints(), RENDER_POSITION.AFTEREND);
    return;
  }

  render(tripEventsTitle, new Sort(), RENDER_POSITION.BEFOREBEGIN);
  renderTripDays(tripDays);
  renderTripEventItems(tripDays);
};

const tripEventItems = generateTripEventsData(TRIP_EVENT_ITEM_QUANTITY);
renderMainContent(tripEventItems);
