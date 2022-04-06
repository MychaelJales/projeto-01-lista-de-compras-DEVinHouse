export const setLocalStorage = (list) => {
  localStorage.setItem('list', JSON.stringify(list));
};

export const getLocalStorage = () => {
  const list = JSON.parse(localStorage.getItem('list'));
  if (list) {
    return list;
  } else {
    return [];
  }
};
