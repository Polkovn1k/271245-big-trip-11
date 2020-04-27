import {RENDER_POSITION, render, replace} from '../utils/render';
import Sort, {SORT_TYPE} from '../components/sort-component';
import TripEventItem from '../components/trip-event-item-component';
import TripEventEditItem from '../components/event-edit-component';
import TripDaysList from '../components/trip-days-list-component';
import TripDaysItem from '../components/trip-days-item-component';
import TripEventList from '../components/trip-events-list-component';
import NoPoints from '../components/no-points-component';
import {generateTripDays, getTripDaysString} from "../mock-data/trip-event-date-data";

const getSortedEventsData = (eventDataList, sortType) => {
  let sortedEvents;
  const showingEvents = eventDataList.slice();

  switch (sortType) {
    case SORT_TYPE.EVENT:
      sortedEvents = showingEvents;
      break;
    case SORT_TYPE.TIME:
      sortedEvents = showingEvents.sort((a, b) => (new Date(b.date.endDate) - new Date(b.date.startDate)) - (new Date(a.date.endDate) - new Date(a.date.startDate)));
      break;
    case SORT_TYPE.PRICE:
      sortedEvents = showingEvents.sort((a, b) => b.price - a.price);
      break;
  }

  return sortedEvents;
};

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

const renderTripEventItems = (container, eventDataList, tripDay) => {
  render(container, new TripEventList(), RENDER_POSITION.BEFOREEND);
  const tripEventsList = container.querySelector(`.trip-events__list`);
  const dataList = tripDay ?
    eventDataList.slice().filter((eventItem) => getTripDaysString(eventItem) === tripDay) :
    eventDataList.slice();

  dataList.forEach((currentDayEvent) => {
    renderEvent(tripEventsList, currentDayEvent);
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

    const renderDefaultEvents = () => {
      tripDays.forEach((item, i) => {
        render(this._tripDaysListComponent.getElement(), new TripDaysItem(item, i + 1), RENDER_POSITION.BEFOREEND);
      });

      const tripDaysItem = container.querySelectorAll(`.trip-days__item`);
      tripDaysItem.forEach((tripDayItem, i) => {
        renderTripEventItems(tripDayItem, eventDataList, tripDays[i]);
      });
    };

    render(container, this._sortComponent, RENDER_POSITION.BEFOREEND);
    render(container, this._tripDaysListComponent, RENDER_POSITION.BEFOREEND);
    renderDefaultEvents();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      this._sortComponent.getElement().querySelector(`#${sortType}`).checked = true;
      this._tripDaysListComponent.getElement().innerHTML = ``;

      if (sortType === SORT_TYPE.EVENT) {
        renderDefaultEvents();
        return;
      }

      render(this._tripDaysListComponent.getElement(), new TripDaysItem(), RENDER_POSITION.BEFOREEND);
      const dataList = getSortedEventsData(eventDataList, sortType);
      const newContainer = container.querySelector(`.trip-days__item`);
      renderTripEventItems(newContainer, dataList);
    });
  }
}
