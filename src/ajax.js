/* global XMLHttpRequest */
export default function (type, url) {
  const xhr = new XMLHttpRequest();
  xhr.open(type, url, true);
  let cancelPromise = () => {};
  const ret = {
    promise: new Promise((resolve, reject) => {
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 400) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(xhr.status));
        }
      };
      cancelPromise = () => {  // SPECIFY CANCELLATION
        xhr.abort(); // abort request
        reject('Cancelled'); // reject the promise
      };
      xhr.onerror = reject;
    }),
  };
  ret.cancel = cancelPromise;
  xhr.send();
  return ret;
}
