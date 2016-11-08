/* global localStorage */
export default {
  load: (key) => {
    if (typeof (Storage) === 'undefined') {
      return false;
    }
    const record = JSON.parse(localStorage.getItem(key));
    if (!record) {
      return false;
    }
    return (new Date().getTime() < record.timestamp && JSON.parse(record.value));
  },
  save: (key, jsonData, expirationMS) => {
    if (typeof (Storage) === 'undefined') {
      return false;
    }
    // var expirationMS = expirationMin * 60 * 1000;
    const record = {
      timestamp: new Date().getTime() + expirationMS,
      value: JSON.stringify(jsonData),
    };
    localStorage.setItem(key, JSON.stringify(record));
    return jsonData;
  },
};
