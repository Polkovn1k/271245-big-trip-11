import {createElement} from '../utils';

const createCostTemplate = () => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>`
  );
};

export class CostTemplate {
  constructor(data) {
    this._costData = data;
    this._elem = null;
  }

  getTemplate() {
    return createCostTemplate(this._costData);
  }

  getElement() {
    if (!this._elem) {
      this._elem = createElement(this.getTemplate());
    }

    return this._elem;
  }

  removeElement() {
    this._elem = null;
  }
}
