import {RENDER_POSITION, render, replace} from '../utils/render';
import {Sort} from '../components/sort-component';
import {TripEventItem} from '../components/trip-event-item-component';
import {TripEventEditItem} from '../components/event-edit-component';
import {TripDaysList} from '../components/trip-days-list-component';
import {TripDaysItem} from '../components/trip-days-item-component';
import {TripEventList} from '../components/trip-events-list-component';
import {NoPoints} from '../components/no-points-component';
import {generateTripDays, getTripDaysString} from "../mock-data/trip-event-date-data";

const renderTripDays = (container, tripDays) => {
  const tripDaysList = new TripDaysList();
  render(container, tripDaysList, RENDER_POSITION.BEFOREEND);

  Array.from(tripDays)
    .forEach((item, i) => {
      render(tripDaysList.getElement(), new TripDaysItem(item, i + 1), RENDER_POSITION.BEFOREEND);
    });
};

const renderEvent = (eventsContainer, data) => {
  const tripEventItem = new TripEventItem(data);
  const tripEventEditItem = new TripEventEditItem(data);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replace(tripEventItem, tripEventEditItem);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  tripEventItem.setEditButtonClickHandler(() => {
    replace(tripEventEditItem, tripEventItem);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  tripEventEditItem.setSubmitHandler((evt) => {
    evt.preventDefault();
    replace(tripEventItem, tripEventEditItem);
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventsContainer, tripEventItem, RENDER_POSITION.BEFOREEND);
};

const renderTripEventItems = (container, tripDays, data) => {
  const tripDaysItem = container.querySelectorAll(`.trip-days__item`);
  tripDaysItem.forEach((item) => {
    render(item, new TripEventList(), RENDER_POSITION.BEFOREEND);
    const tripEventsList = item.querySelector(`.trip-events__list`);

    data
      .slice()
      .sort((a, b) => new Date(a.date.startDate) - new Date(b.date.startDate))
      .filter((eventItem) => getTripDaysString(eventItem) === tripDays[0])
      .forEach((currentDayEvent) => {
        renderEvent(tripEventsList, currentDayEvent);
      });
    tripDays.shift();
  });
};

const renderMainContent = (container, data) => {
  const tripDays = generateTripDays(data);

  if (!data.length) {
    render(container, new NoPoints(), RENDER_POSITION.BEFOREEND);
    return;
  }

  render(container, new Sort(), RENDER_POSITION.BEFOREEND);
  renderTripDays(container, tripDays);
  renderTripEventItems(container, tripDays, data);
};

export class TripController {
  constructor(container) {
    this._container = container;
  }

  render(data) {
    renderMainContent(this._container, data);
  }
}
