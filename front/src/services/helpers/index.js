export const fromObjectListToSelectOptions = (object) => (
  Object.entries(object).map(([key, value]) => ({
    label: value,
    value: key,
  }))
);