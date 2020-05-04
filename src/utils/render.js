const RenderPosition = {
  BEFOREBEGIN: `beforeBegin`,
  AFTERBEGIN: `afterBegin`,
  BEFOREEND: `beforeEnd`,
  AFTEREND: `afterEnd`,
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

export {RenderPosition, createElement, render, replace, remove};
