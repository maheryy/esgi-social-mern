export const fromObjectListToSelectOptions = (object) => (
  Object.entries(object).map(([key, value]) => ({
    label: value,
    value: key,
  }))
);

export const getLocalStorageItem = (key) => {
  return (JSON.parse(localStorage.getItem(key)))
};


export const getTimeFromDate = (date) => {
  const d = new Date(date);

  return `${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}`;
};
