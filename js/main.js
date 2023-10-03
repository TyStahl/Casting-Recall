const $searchTerm = document.querySelector('#film-search');

$searchTerm.addEventListener('input', captureSearch);

function captureSearch(event) {
  const term = $searchTerm.value;
  // const uri = `https://lfz-cors.herokuapp.com/?url=`;
  // const targetURL = uri + `https://api.themoviedb.org/3/search/movie?${placeholder}include_adult=false&language=en-US&page=1`;
  return term;
}

// const $movieList = document.querySelector('#render-list');

// let targetURL = '';
// function encodeURIComponent(string) {
//   const uri = 'https://lfz-cors.herokuapp.com/?url=';
//   targetURL = uri + https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1;
// }

// function movieByTitle(string) {
//   const xhr = new XMLHttpRequest();
//   xhr.withCredentials = true;
//   xhr.open('GET', targetURL + term);
//   xhr.responseType = 'json';
//   xhr.setRequestHeader('accept', 'application/json');
//   xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmQwZGQ1MGI5MzViZjM3NzkyMWE3ZTA2OGFjY2VjNSIsInN1YiI6IjY1MTViNzcyZWE4NGM3MDBhZWU4ODI0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1LFt7yZr-QHp66Wims95ri7xuVOFeHDZMj0tIYzLixY');
//   xhr.send();
// }
