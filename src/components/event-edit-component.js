import {TRANSFER_TYPE, ACTIVITY_TYPE, EVENT_DESTINATION} from '../const';
import {formatTime, checkEventType, castTimeFormat} from '../utils/common';
import {generateTripEventOfferData} from '../mock-data/trip-event-offer-data';
import {generateTripEventDestinationData} from "../mock-data/trip-event-destination-data";
import AbstractSmartComponent from "./abstract-smart-component.js";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_blue.css";

const generatePhoto = (imgSrcArr, destinationName) => {
  return imgSrcArr
    .map((item, i) => (`<img class="event__photo" src="${item}" alt="${destinationName} - photo №${i + 1}">`))
    .join(`\n`);
};

const generateEventTypeItems = (eventTypes) => {
  return eventTypes
    .map((item) => (
      `<div class="event__type-item">
        <input id="event-type-${item}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}">
        <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-1">${item}</label>
      </div>`))
    .join(`\n`);
};

const getEventOfferSelecterTemplate = (offerData) => {
  return offerData
    .map((item, i) => (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${i}" type="checkbox" name="event-offer-luggage" ${item.checked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-luggage-${i}">
          <span class="event__offer-title">${item.title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${item.price}</span>
        </label>
      </div>`))
    .join(`\n`);
};

const getDateString = (dateObj) => {
  const day = dateObj.getDate();
  const month = castTimeFormat(dateObj.getMonth() + 1);
  const year = String(dateObj.getFullYear()).slice(2);

  return `${day}/${month}/${year}`;
};

const generateOptions = (optValue) => {
  return optValue
    .map((item) => (`<option value="${item}"></option>`))
    .join(`\n`);
};

const createEventEditTemplate = (obj, options) => {
  const {price, date, isFavorite} = obj;
  const {eventTypeData, destinationNameData, offers, destinationDescription, destinationPhoto} = options;
  const favoriteStatus = isFavorite ? `checked` : ``;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${eventTypeData.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${generateEventTypeItems(TRANSFER_TYPE)}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${generateEventTypeItems(ACTIVITY_TYPE)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${eventTypeData} ${checkEventType(eventTypeData, ACTIVITY_TYPE)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationNameData}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${generateOptions(EVENT_DESTINATION)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDateString(date.startDate)} ${formatTime(date.startDate)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDateString(date.endDate)} ${formatTime(date.endDate)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${favoriteStatus}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

      </header>

      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${getEventOfferSelecterTemplate(offers)}
          </div>
        </section>
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destinationDescription.join(` `)}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${generatePhoto(destinationPhoto, destinationNameData)}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
};

export default class TripEventEditItem extends AbstractSmartComponent {
  constructor(data) {
    super();
    this._tripEventEditItemData = data;
    this._eventTypeData = data.type;
    this._destinationName = data.destinationName;
    this._offersDataArray = data.offers;
    this._destinationDescription = data.destinationInfo.destinationDescription;
    this._destinationPhoto = data.destinationInfo.destinationPhoto;

    this._submitHandler = null;
    this._flatpickrStart = null;
    this._flatpickrEnd = null;

    this._subscribeOnEvents();
    this._applyFlatpickr();
  }

  getTemplate() {
    return createEventEditTemplate(this._tripEventEditItemData, {
      eventTypeData: this._eventTypeData,
      destinationNameData: this._destinationName,
      offers: this._offersDataArray,
      destinationDescription: this._destinationDescription,
      destinationPhoto: this._destinationPhoto,
    });
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  _applyFlatpickr() {
    if (this._flatpickrStart && this._flatpickrEnd) {
      this._flatpickrStart.destroy();
      this._flatpickrStart = null;
      this._flatpickrEnd.destroy();
      this._flatpickrEnd = null;
    }

    const startDateElement = this.getElement().querySelector(`.event__input--time[name="event-start-time"]`);
    this._flatpickrStart = flatpickr(startDateElement, {
      enableTime: true,
      altInput: true,
      allowInput: true,
      dateFormat: `Y/m/d H:i`,
      altFormat: `Y/m/d H:i`,
      defaultDate: this._tripEventEditItemData.date.startDate,
    });

    const endDateElement = this.getElement().querySelector(`.event__input--time[name="event-end-time"]`);
    this._flatpickrStart = flatpickr(endDateElement, {
      enableTime: true,
      altInput: true,
      allowInput: true,
      dateFormat: `Y/m/d H:i`,
      altFormat: `Y/m/d H:i`,
      defaultDate: this._tripEventEditItemData.date.endDate,
    });
  }

  setSubmitHandler(handler) {
    this.getElement()
      .addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, handler);
  }

  setEventTypeBtnsClickHandler(handler) {
    this.getElement()
      .querySelectorAll(`.event__type-label`)
      .forEach((item) => item.addEventListener(`click`, handler));
  }

  setDestinationChangeHandler(handler) {
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, handler);
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    this.setSubmitHandler(this._submitHandler);

    element.querySelectorAll(`.event__type-label`)
      .forEach((item) => {
        item.addEventListener(`click`, (evt) => {
          const newEventTypeData = element.querySelector(`#${evt.target.htmlFor}`).value;
          this._eventTypeData = newEventTypeData;
          this._offersDataArray = generateTripEventOfferData()[this._eventTypeData];

          this.rerender();
        });
      });

    element.querySelector(`.event__input--destination`)
      .addEventListener(`change`, (evt) => {
        const isRightValue = EVENT_DESTINATION.some((item) => evt.target.value === item);
        this._destinationName = isRightValue ? evt.target.value : this._destinationName;

        const destinationInfo = generateTripEventDestinationData();
        this._destinationDescription = destinationInfo.destinationDescription;
        this._destinationPhoto = destinationInfo.destinationPhoto;

        this.rerender();
      });
  }
}
