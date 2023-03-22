// proposal:
// test case:
// 1. constructor - positions
// 2. add - check style, check text
// 3. addError
// 4. addWarning
// 5. multiple messages.

/**
 * MessageQueue. A queue of hint messages that show the message permanently and sequently
 * @constructor
 * @param {Object} options
 *        All required and optional settings for instantiating a new instance of a MessageQueue.
 *
 * @param {String} [options.position=top-left]
 *        The position of MessageQueue instance shows up. 'top-left', 'top-right', 'bottom-left', 'bottom-right'.
 */
class MessageQueue {
  constructor({ position = 'top-left', element } = {}) {
    this.setting = { position };

    if (element) {
      this.elt = element;
    } else {
      this.elt = document.createElement('div');
      document.body.appendChild(this.elt);
    }

    this.elt.classList.add('bullet-container');
    this.elt.style[this.setting.position.includes('top') ? 'top' : 'bottom'] = 0;
    this.elt.style[this.setting.position.includes('left') ? 'left' : 'right'] = 0;
  }

  addInfo(text, time = 5000) {
    this.__add(text, 'info', time);
  }

  addError(text, time = 5000) {
    this.__add(text, 'error', time);
  }

  addWarning(text, time = 5000) {
    this.__add(text, 'warning', time);
  }

  addSmall(text, time = 1000) {
    this.__add(text, 'small', time);
  }

  __add(text, type, time) {
    const div = MessageQueue.createBullet(text, type);
    this.elt.insertBefore(div, this.elt.firstChild);
    if (this.setting.position.includes('right')) {
      div.classList.add('right');
    }

    div.addEventListener('transitionend', this.__destroy.bind(div));

    setTimeout(() => {
      div.classList.add('hide');
    }, time);
  }

  __destroy(e) {
    if (e.propertyName === 'opacity') {
      this.parentNode.removeChild(this);
    }
  }

  static createBullet(text, type) {
    return `<div class="bullet ${type}">${text}</div>`;
  }
}
