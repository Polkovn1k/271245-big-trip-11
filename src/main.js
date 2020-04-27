import {RENDER_POSITION, render} from './utils/render';
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
  render(tripMain, infoContainer, RENDER_POSITION.AFTERBEGIN);
  render(infoContainer.getElement(), new Cost(), RENDER_POSITION.BEFOREEND);
  if (infoData.length) {
    render(tripMain, new MainInfo(infoData), RENDER_POSITION.AFTERBEGIN);
  }
};

const renderTripMainControls = () => {
  const tripMainControls = tripMain.querySelector(`.trip-main__trip-controls`);
  const tripMainControlsTitle = tripMain.querySelector(`.trip-main__trip-controls h2:first-child`);

  render(tripMainControls, new Filter(), RENDER_POSITION.BEFOREEND);
  render(tripMainControlsTitle, new Menu(), RENDER_POSITION.AFTEREND);
};

const tripEventItems = generateTripEventsData(TRIP_EVENT_ITEM_QUANTITY);

const mainTripListController = new TripController(tripEvents);

renderTripMainControls();
renderInfo(tripEventItems);
mainTripListController.render(tripEventItems);
