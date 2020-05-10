import {RenderPosition, render} from './utils/render';
import InfoContainer from './components/info-container-component';
import MainInfo from './components/main-info-component';
import Cost from './components/cost-component';
import Menu from './components/menu-component';
import Filter from './components/filter-component';
import TripController from './controller/trip';
import {generateTripEventsData} from "./mock-data/trip-event-item-data";

const TRIP_EVENT_ITEM_QUANTITY = 20;
const tripMain = document.querySelector(`.trip-main`);
const tripEvents = document.querySelector(`.trip-events`);

const renderInfo = (infoData) => {
  const infoContainer = new InfoContainer();
  render(tripMain, infoContainer, RenderPosition.AFTERBEGIN);
  render(infoContainer.getElement(), new Cost(), RenderPosition.BEFOREEND);
  if (infoData.length) {
    render(tripMain, new MainInfo(infoData), RenderPosition.AFTERBEGIN);
  }
};

const renderTripMainControls = () => {
  const tripMainControls = tripMain.querySelector(`.trip-main__trip-controls`);
  const tripMainControlsTitle = tripMain.querySelector(`.trip-main__trip-controls h2:first-child`);

  render(tripMainControls, new Filter(), RenderPosition.BEFOREEND);
  render(tripMainControlsTitle, new Menu(), RenderPosition.AFTEREND);
};

const tripEventItems = generateTripEventsData(TRIP_EVENT_ITEM_QUANTITY)
  .sort((a, b) => new Date(a.date.startDate) - new Date(b.date.startDate));

const mainTripListController = new TripController(tripEvents);

renderTripMainControls();
renderInfo(tripEventItems);
mainTripListController.render(tripEventItems);
