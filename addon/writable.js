import computed from './computed';
import { isPresent } from '@ember/utils';

export default function(getter, setterCallback) {
  let newCallback = {
    get(val) {
      if (isPresent(this._val)) {
        return this._val;
      }
      return val;
    },
    set(val) {
      this.set('this._val', val);
      return this._val;
    }
  };

  if (setterCallback) {
    if (typeof setterCallback === 'object' && setterCallback.set) {
      newCallback.set = setterCallback.set;
    } else {
      newCallback.set = function() {
        return setterCallback.apply(this, arguments);
      };
    }
  }

  return computed(getter, newCallback);
}
