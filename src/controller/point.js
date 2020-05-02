import {renderPosition, render, replace} from '../utils/render';
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
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._tripEventEditItem.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToTask();
    });

    this._tripEventEditItem.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, eventItemData, Object.assign({}, eventItemData, {
        isFavorite: !eventItemData.isFavorite,
      }));
    });

    if (oldEventEditComponent && oldEventComponent) {
      replace(this._tripEventItem, oldEventComponent);
      replace(this._tripEventEditItem, oldEventEditComponent);
    } else {
      render(this._container, this._tripEventItem, renderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToTask();
    }
  }

  _replaceEditToTask() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    replace(this._tripEventItem, this._tripEventEditItem);
    this._mode = Mode.DEFAULT;
  }

  _replaceTaskToEdit() {
    this._onViewChange();
    replace(this._tripEventEditItem, this._tripEventItem);
    this._mode = Mode.EDIT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replace(this._tripEventItem, this._tripEventEditItem);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
