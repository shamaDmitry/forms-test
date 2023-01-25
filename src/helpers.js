export const compareName = (a, b) => {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  
  return 0;
}

export const FILTER_MAP = {
  all: () => true,
  
  selectedOnly: (item) => item.isSelected,
};