import {sortTypeTitle} from '../const';
import {RENDER_POSITION, render, replace} from '../utils/render';
import Sort from '../components/sort-component';
import TripDaysList from '../components/trip-days-list-component';
import TripDaysItem from '../components/trip-days-item-component';
import TripEventList from '../components/trip-events-list-component';
import NoPoints from '../components/no-points-component';
import PointController from "./point.js";
import {generateTripDays, getTripDaysString} from "../mock-data/trip-event-date-data";

const getSortedEventsData = (eventDataList, sortType) => {
  let sortedEvents;
  const showingEvents = eventDataList.slice();

  switch (sortType) {
    case sortTypeTitle.EVENT:
      sortedEvents = showingEvents;
      break;
    case sortTypeTitle.TIME:
      sortedEvents = showingEvents.sort((a, b) => (new Date(b.date.endDate) - new Date(b.date.startDate)) - (new Date(a.date.endDate) - new Date(a.date.startDate)));
      break;
    case sortTypeTitle.PRICE:
      sortedEvents = showingEvents.sort((a, b) => b.price - a.price);
      break;
  }

  return sortedEvents;
};


const renderTripEventItems = (container, eventDataList, tripDay, onDataChange) => {
  render(container, new TripEventList(), RENDER_POSITION.BEFOREEND);
  const tripEventsList = container.querySelector(`.trip-events__list`);
  const dataList = tripDay ?
    eventDataList.slice().filter((eventItem) => getTripDaysString(eventItem) === tripDay) :
    eventDataList.slice();

  return dataList.map((currentDayEvent) => {
    const eventController = new PointController(tripEventsList, onDataChange);
    eventController.render(currentDayEvent);

    return eventController;
  });
};

const renderDefaultTripEventItems = (tripDays, container, tripDaysListComponent, eventDataList, tripController, onDataChange) => {
  tripDays.forEach((item, i) => {
    render(tripDaysListComponent.getElement(), new TripDaysItem(item, i + 1), RENDER_POSITION.BEFOREEND);
  });

  const tripDaysItem = container.querySelectorAll(`.trip-days__item`);
  tripController._showedEventControllers = [];
  tripDaysItem.forEach((tripDayItem, i) => {
    tripController._showedEventControllers = tripController._showedEventControllers.concat(renderTripEventItems(tripDayItem, eventDataList, tripDays[i], onDataChange));
  });
};

export default class Trip {
  constructor(container) {
    this._container = container;

    this._eventsData = [];
    this._showedEventControllers = [];
    this._sortComponent = new Sort();
    this._tripDaysListComponent = new TripDaysList();
    this._noPointsComponent = new NoPoints();
    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(eventDataList) {
    this._eventsData = eventDataList;
    const container = this._container;
    const tripDays = generateTripDays(this._eventsData);

    if (!this._eventsData.length) {
      render(container, this._noPointsComponent, RENDER_POSITION.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RENDER_POSITION.BEFOREEND);
    render(container, this._tripDaysListComponent, RENDER_POSITION.BEFOREEND);
    renderDefaultTripEventItems(tripDays, container, this._tripDaysListComponent, this._eventsData, this, this._onDataChange);
  }

  _onSortTypeChange(sortType) {
    const container = this._container;
    const tripDays = generateTripDays(this._eventsData);
    this._sortComponent.getElement().querySelector(`#${sortType}`).checked = true;
    this._tripDaysListComponent.getElement().innerHTML = ``;

    if (sortType === sortTypeTitle.EVENT) {
      renderDefaultTripEventItems(tripDays, container, this._tripDaysListComponent, this._eventsData, this, this._onDataChange);
      return;
    }

    render(this._tripDaysListComponent.getElement(), new TripDaysItem(), RENDER_POSITION.BEFOREEND);
    const dataList = getSortedEventsData(this._eventsData, sortType);
    const newContainer = container.querySelector(`.trip-days__item`);
    this._showedEventControllers = renderTripEventItems(newContainer, dataList);
  }

  _notify(index) {
    this._showedEventControllers[index].render(this._eventsData[index]);
  }

  _onDataChange(oldData, newData) {
    const index = this._eventsData.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._eventsData = [].concat(this._eventsData.slice(0, index), newData, this._eventsData.slice(index + 1));
    this._notify(index);
  }
}
