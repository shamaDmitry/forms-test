export const compareName = (a, b) => {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  // a должно быть равным b
  return 0;
}

export const isSelectedFilter = (item) => {
  // console.log('isSelectedFilter', item);
  return item.isSelected ? item : null;
}