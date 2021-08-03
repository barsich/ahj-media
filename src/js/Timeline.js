/* eslint-disable no-unused-expressions */
export default class Timeline {
  constructor(markups) {
    this.markups = markups;
    this.input = null;
    this.timelineItems = document.getElementsByClassName('timeline__item');
    this.timelineText = null;

    this.addItem = this.addItem.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  init() {
    this.markups.render();
    this.input = document.querySelector('.timeline-input');
    this.input.addEventListener('keyup', this.addItem);
    document.addEventListener('click', this.onClick);
  }

  addItem(event) {
    if (event.key !== 'Enter' || this.input.value === '') {
      return;
    }
    this.timelineText = event.target.value;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // success
        (position) => {
          const item = this.markups.timelineTextItem(
            this.timelineText,
            position.coords,
            position.timestamp,
          );
          this.timelineItems.length === 0
            ? this.markups.container.appendChild(item)
            : this.markups.container.insertBefore(item, this.timelineItems[0]);
        },
        // error
        () => {
          this.markups.container.appendChild(this.markups.modalGeo());
          this.input.disabled = true;
        },
      );
      this.input.value = '';
    }
  }

  onClick(event) {
    if (
      !event.target.classList.contains('geoposition-modal__ok-button')
      && !event.target.classList.contains('geoposition-modal__cancel-button')
    ) {
      return;
    }
    const modal = event.target.closest('.modal');
    const modalInput = modal.querySelector('.geoposition-modal__input');
    if (event.target.classList.contains('geoposition-modal__ok-button')) {
      const position = this.getManualPosition(modalInput.value);
      if (!position) {
        const errorMessage = document.querySelector('.error-message');
        if (!errorMessage) {
          const error = document.createElement('p');
          error.classList.add('error-message');
          error.textContent = 'Проверьте корректность ввода';
          modal.insertBefore(error, modalInput);
        }
      } else {
        const item = this.markups.timelineTextItem(this.timelineText, position, Date.now());
        this.timelineItems.length === 0
          ? this.markups.container.appendChild(item)
          : this.markups.container.insertBefore(item, this.timelineItems[0]);

        modal.remove();
      }
    } else if (event.target.classList.contains('geoposition-modal__cancel-button')) {
      modal.remove();
    }
    if (!document.querySelector('.modal')) {
      this.input.disabled = false;
    }
  }

  static getManualPosition(value) {
    const parsedValue = value.match(/[+-]?\d+\.\d+/g);
    if (!parsedValue || parsedValue.length !== 2) {
      return false;
    }
    return { latitude: parsedValue[0], longitude: parsedValue[1] };
  }
}
