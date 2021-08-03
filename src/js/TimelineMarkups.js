/* eslint-disable class-methods-use-this */
export default class TimelineMarkups {
  constructor(container) {
    this.container = container;
  }

  render() {
    const line = document.createElement('div');
    line.classList.add('timeline');
    const lineInpit = document.createElement('input');
    lineInpit.classList.add('timeline-input');

    this.container.appendChild(line);
    this.container.appendChild(lineInpit);
  }

  modalGeo() {
    const modal = document.createElement('div');
    modal.classList.add('geoposition-modal', 'modal');

    const modalTitle = document.createElement('h2');
    modalTitle.classList.add('geoposition-modal__title');
    modalTitle.textContent = 'Что-то пошло не так...';

    const modalDesc = document.createElement('p');
    modalDesc.classList.add('geoposition-modal__description');
    modalDesc.textContent = `
    Не удалось автоматически определить ваше местоположение. Введите координаты вручную.
    Широта и долгота через запятую:
    `;

    const modalInpit = document.createElement('input');
    modalInpit.classList.add('geoposition-modal__input');
    modalInpit.required = true;

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('geoposition-modal__cancel-button', 'button');
    cancelButton.textContent = 'Отмена';

    const okButton = document.createElement('button');
    okButton.classList.add('geoposition-modal__ok-button', 'button');
    okButton.textContent = 'Ок';

    modal.appendChild(modalTitle);
    modal.appendChild(modalDesc);
    modal.appendChild(modalInpit);
    modal.appendChild(cancelButton);
    modal.appendChild(okButton);

    return modal;
  }

  timelineTextItem(text, coords, date = Date.now()) {
    const { latitude, longitude } = coords;
    const item = document.createElement('div');
    item.classList.add('timeline__item');

    const itemText = document.createElement('p');
    itemText.classList.add('timeline__item-text');
    itemText.textContent = text;

    const itemTime = document.createElement('p');
    itemTime.classList.add('timeline__item-time');
    itemTime.textContent = new Date(date).toLocaleString();

    const itemCoords = document.createElement('a');
    itemCoords.classList.add('timeline__item-coords');
    itemCoords.href = `http://maps.google.com/maps?q=${latitude},${longitude}`;
    itemCoords.textContent = `[${latitude}, ${longitude}]`;

    item.appendChild(itemText);
    item.appendChild(itemTime);
    item.appendChild(itemCoords);

    return item;
  }
}
