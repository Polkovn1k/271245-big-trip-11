import {AbstractComponent} from "./abstract-component.js";

const createInfoContainerTemplate = () => {
  return (
    `<section class="trip-main__trip-info  trip-info"></section>`
  );
};

export class InfoContainer extends AbstractComponent {
  getTemplate() {
    return createInfoContainerTemplate();
  }
}
