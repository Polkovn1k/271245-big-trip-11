import {RenderPosition, render, replace} from '../utils/render';
import TripEventItem from '../components/trip-event-item-component';
import TripEventEditItem from '../components/event-edit-component';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class Point {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._tripEventItem = null;
    this._tripEventEditItem = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(eventItemData) {
    const oldEventComponent = this._tripEventItem;
    const oldEventEditComponent = this._tripEventEditItem;

    this._tripEventItem = new TripEventItem(eventItemData);
    this._tripEventEditItem = new TripEventEditItem(eventItemData);

    this._tripEventItem.setEditButtonClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._tripEventEditItem.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToEvent();
    });

    this._tripEventEditItem.setFavoritesButtonClickHandler(() => {
      this._onDataChange(eventItemData, Object.assign({}, eventItemData, {
        isFavorite: !eventItemData.isFavorite,
      }));
    });

    if (oldEventEditComponent && oldEventComponent) {
      replace(this._tripEventItem, oldEventComponent);
      replace(this._tripEventEditItem, oldEventEditComponent);
    } else {
      render(this._container, this._tripEventItem, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  _replaceEditToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._tripEventEditItem.reset();
    replace(this._tripEventItem, this._tripEventEditItem);
    this._mode = Mode.DEFAULT;
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replace(this._tripEventEditItem, this._tripEventItem);
    this._mode = Mode.EDIT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
