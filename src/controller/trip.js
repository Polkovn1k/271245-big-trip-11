import {SortTypeTitle} from '../const';
import {RenderPosition, render} from '../utils/render';
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
    case SortTypeTitle.EVENT:
      sortedEvents = showingEvents;
      break;
    case SortTypeTitle.TIME:
      sortedEvents = showingEvents.sort((a, b) => (new Date(b.date.endDate) - new Date(b.date.startDate)) - (new Date(a.date.endDate) - new Date(a.date.startDate)));
      break;
    case SortTypeTitle.PRICE:
      sortedEvents = showingEvents.sort((a, b) => b.price - a.price);
      break;
  }

  return sortedEvents;
};

export default class Trip {
  constructor(container) {
    this._container = container;

    this._eventsData = [];
    this._showedEventControllers = [];
    this._tripDays = null;
    this._sortComponent = new Sort();
    this._tripDaysListComponent = new TripDaysList();
    this._noPointsComponent = new NoPoints();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  _renderDay(eventsData, tripDay, dayCount) {
    const dayComponent = tripDay
      ? new TripDaysItem(tripDay, dayCount + 1)
      : new TripDaysItem();
    const eventList = new TripEventList();

    render(this._tripDaysListComponent.getElement(), dayComponent, RenderPosition.BEFOREEND);
    render(dayComponent.getElement(), eventList, RenderPosition.BEFOREEND);

    eventsData.forEach((event) => {
      const pointController = new PointController(eventList.getElement(), this._onDataChange, this._onViewChange);
      this._showedEventControllers.push(pointController);
      pointController.render(event);
    });
  }

  _generateRenderDays(daysArr) {
    daysArr
      .slice()
      .forEach((currentTripDay, count) => {
        const currentEventData = this._eventsData
          .filter((eventItem) => getTripDaysString(eventItem) === currentTripDay);
        this._renderDay(currentEventData, currentTripDay, count);
      });
  }

  render(eventDataList) {
    this._eventsData = eventDataList;
    this._tripDays = generateTripDays(this._eventsData);
    const container = this._container;

    if (!this._eventsData.length) {
      render(container, this._noPointsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._tripDaysListComponent, RenderPosition.BEFOREEND);

    this._generateRenderDays(this._tripDays);
  }

  _onSortTypeChange(sortType) {
    this._sortComponent.getElement().querySelector(`#${sortType}`).checked = true;
    this._tripDaysListComponent.getElement().innerHTML = ``;
    this._showedEventControllers = [];

    if (sortType === SortTypeTitle.EVENT) {
      this._generateRenderDays(this._tripDays);
      return;
    }

    const sortedDataList = getSortedEventsData(this._eventsData, sortType);
    this._renderDay(sortedDataList);
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._eventsData.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._eventsData = [].concat(this._eventsData.slice(0, index), newData, this._eventsData.slice(index + 1));

    taskController.render(this._eventsData[index]);
    console.dir(this._eventsData[index]);
  }

  _onViewChange() {
    this._showedEventControllers.forEach((it) => it.setDefaultView());
  }
}
