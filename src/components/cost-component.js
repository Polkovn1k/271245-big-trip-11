import {AbstractComponent} from "./abstract-component.js";

const createCostTemplate = () => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>`
  );
};

export class Cost extends AbstractComponent {
  getTemplate() {
    return createCostTemplate();
  }
}
