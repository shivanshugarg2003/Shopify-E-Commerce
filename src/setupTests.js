// Mock MutationObserver
global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};
const originalWarn = console.warn;
const originalLog = console.log;
if (!window.getSelection) {
  window.getSelection = () => ({
    removeAllRanges: () => {},
    addRange: () => {},
    getRangeAt: () => ({
      cloneRange: () => ({})
    }),
  });
}
// Silence ToastContainer warning by mocking it
jest.mock('react-toastify', () => {
  const originalModule = jest.requireActual('react-toastify');
  return {
    ...originalModule,
    ToastContainer: () => null,
  };
});
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Suppress known warnings from React and libraries during test runs
const suppressedWarnings = [
  /ReactDOM\.render is no longer supported/i,
  /unmountComponentAtNode is deprecated/i,
  /ToastContainer: Support for defaultProps/i,
  /React Router Future Flag Warning: React Router will begin wrapping state updates/i,
  /React Router Future Flag Warning: Relative route resolution within Splat routes is changing/i,
  /Added Test Product to cart/i,
];

const originalError = console.error;

beforeAll(() => {
  console.error = (...args) => {
    if (args.length && typeof args[0] === 'string') {
      if (suppressedWarnings.some(pattern => pattern.test(args[0]))) {
        return;
      }
    }
    originalError(...args);
  };

  console.warn = (...args) => {
    if (args.length && typeof args[0] === 'string') {
      if (suppressedWarnings.some(pattern => pattern.test(args[0]))) {
        return;
      }
    }
    originalWarn(...args);
  };

  console.log = (...args) => {
    if (args.length && typeof args[0] === 'string') {
      if (suppressedWarnings.some(pattern => pattern.test(args[0]))) {
        return;
      }
    }
    originalLog(...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
  console.log = originalLog;
});
