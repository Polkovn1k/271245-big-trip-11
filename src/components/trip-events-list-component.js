import {AbstractComponent} from "./abstract-component.js";

const createTripEventsListTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};

export class TripEventList extends AbstractComponent {
  getTemplate() {
    return createTripEventsListTemplate();
  }
}
