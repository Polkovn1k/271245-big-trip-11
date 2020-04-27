import {RENDER_POSITION, render, replace} from '../utils/render';
import Sort from '../components/sort-component';
import TripEventItem from '../components/trip-event-item-component';
import TripEventEditItem from '../components/event-edit-component';
import TripDaysList from '../components/trip-days-list-component';
import TripDaysItem from '../components/trip-days-item-component';
import TripEventList from '../components/trip-events-list-component';
import NoPoints from '../components/no-points-component';
import {generateTripDays, getTripDaysString} from "../mock-data/trip-event-date-data";

const renderEvent = (eventsContainer, eventItemData) => {
  const tripEventItem = new TripEventItem(eventItemData);
  const tripEventEditItem = new TripEventEditItem(eventItemData);

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

const renderTripEventItems = (container, tripDays, eventDataList) => {
  const tripDaysItem = container.querySelectorAll(`.trip-days__item`);
  tripDaysItem.forEach((item) => {
    render(item, new TripEventList(), RENDER_POSITION.BEFOREEND);
    const tripEventsList = item.querySelector(`.trip-events__list`);

    eventDataList
      .slice()
      .sort((a, b) => new Date(a.date.startDate) - new Date(b.date.startDate))
      .filter((eventItem) => getTripDaysString(eventItem) === tripDays[0])
      .forEach((currentDayEvent) => {
        renderEvent(tripEventsList, currentDayEvent);
      });
    tripDays.shift();
  });
};

export default class Trip {
  constructor(container) {
    this._container = container;

    this._sortComponent = new Sort();
    this._tripDaysListComponent = new TripDaysList();
    this._noPointsComponent = new NoPoints();
  }

  render(eventDataList) {
    const container = this._container;
    const tripDays = generateTripDays(eventDataList);

    if (!eventDataList.length) {
      render(container, this._noPointsComponent, RENDER_POSITION.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RENDER_POSITION.BEFOREEND);
    render(container, this._tripDaysListComponent, RENDER_POSITION.BEFOREEND);

    tripDays.forEach((item, i) => {
      render(this._tripDaysListComponent.getElement(), new TripDaysItem(item, i + 1), RENDER_POSITION.BEFOREEND);
    });

    renderTripEventItems(container, tripDays, eventDataList);
  }
}
