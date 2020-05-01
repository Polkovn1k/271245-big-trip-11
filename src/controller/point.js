import {renderPosition, render, replace} from '../utils/render';
import TripEventItem from '../components/trip-event-item-component';
import TripEventEditItem from '../components/event-edit-component';

export default class Point {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._tripEventItem = null;
    this._tripEventEditItem = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(eventItemData) {
    this._tripEventItem = new TripEventItem(eventItemData);
    this._tripEventEditItem = new TripEventEditItem(eventItemData);

    this._tripEventItem.setEditButtonClickHandler(() => {
      replace(this._tripEventEditItem, this._tripEventItem);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._tripEventEditItem.setSubmitHandler((evt) => {
      evt.preventDefault();
      replace(this._tripEventItem, this._tripEventEditItem);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._tripEventEditItem.setFavoritesButtonClickHandler(() => {
      this._onDataChange(eventItemData, Object.assign({}, eventItemData, {
        isFavorite: !eventItemData.isFavorite,
      }));
    });

    render(this._container, this._tripEventItem, renderPosition.BEFOREEND);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replace(this._tripEventItem, this._tripEventEditItem);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
