export default class Points {
  constructor() {
    this._eventsData = [];

    this._dataChangeHandlers = [];
  }

  getEvent() {
    return this._eventsData;
  }

  setEvent(eventDataItem) {
    this._eventsData = Array.from(eventDataItem);
    this._callHandlers(this._dataChangeHandlers);
  }

  updateEvent(id, eventData) {
    const index = this._eventsData.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._eventsData = [].concat(this._eventsData.slice(0, index), eventData, this._eventsData.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
