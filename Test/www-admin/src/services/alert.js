import store from 'store';


export function success(message) {
  store.dispatch('pushAlert', {
    variant: 'success',
    message,
  });
}

export function danger(message) {
  store.dispatch('pushAlert', {
    variant: 'danger',
    message,
  });
}


export function wrapAsync(callback, successMessage, errorMessage) {
  return async function (...args) {
    try {
      await callback.call(this, ...args);
      success(successMessage);
    } catch (err) {
      danger(errorMessage);
    }
  };
}
