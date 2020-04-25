const RENDER_POSITION = {
  BEFOREBEGIN: `beforebegin`,
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, component, place) => {
  container.insertAdjacentElement(place, component.getElement());
};

const replace = (newComponent, oldComponent) => {
  const newElem = newComponent.getElement();
  const oldElem = oldComponent.getElement();
  const parentContainer = oldElem.parentElement;

  const isExistElements = !!(parentContainer && newElem && oldElem);

  if (isExistElements) {
    parentContainer.replaceChild(newElem, oldElem);
  }
};

const remove = (component) => {
  component.remove();
  component.removeElement();
};

export {RENDER_POSITION, createElement, render, replace, remove};
