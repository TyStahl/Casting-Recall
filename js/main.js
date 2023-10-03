const $searchTerm = document.querySelector('#film-search');

$searchTerm.addEventListener('input', captureSearch);

function captureSearch(event) {
  const searchTerm = $searchTerm.value;

  // console.log(searchTerm);
  return searchTerm;
}
