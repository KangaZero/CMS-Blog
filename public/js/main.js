const searchFunction = (event) => {
  event.preventDefault();
};

document
  .querySelector('#search-button')
  .addEventListener('submit', searchFunction);