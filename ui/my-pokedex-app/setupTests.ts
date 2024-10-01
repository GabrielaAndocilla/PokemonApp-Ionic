import { setupIonicReact } from '@ionic/react';
import '@testing-library/jest-dom';

setupIonicReact();

window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () { },
    removeListener: function () { }
  };
};
