const $searchTerm = document.querySelector('#film-search');

$searchTerm.addEventListener('input', captureSearch);
function captureSearch(event) {
  const term = $searchTerm.value;
  renderMovies();
  // const uri = `https://lfz-cors.herokuapp.com/?url=`;
  // const targetURL = uri + `https://api.themoviedb.org/3/search/movie?${placeholder}include_adult=false&language=en-US&page=1`;
  return term;
}

// function renderxhrTerm(string) {
//   const uriURL = 'https://lfz-cors.herokuapp.com/?url=';
//   const targetURL = `https://api.themoviedb.org/3/search/movie?${placeholder}?include_adult=false&language=en-US&page=1`;
//   const array = string.split('');

// }

const $movieList = document.querySelector('#render-list');

// render list items
function renderMovies() {
  const $movieListItem = document.createElement('li');
  $movieListItem.setAttribute('class', 'column-full column-half no-wrap card');
  $movieList.appendChild($movieListItem);

  const $moviePosterBox = document.createElement('div');
  $moviePosterBox.setAttribute('class', 'poster a-center');
  $movieListItem.appendChild($moviePosterBox);

  const $movieTitleBox = document.createElement('div');
  $movieTitleBox.setAttribute('class', 'column-half a-center');
  $movieListItem.appendChild($movieTitleBox);

  const $movieTitle = document.createElement('div');
  $movieTitle.textContent = 'Movie Title and the Movies\'s Title';
  $movieTitleBox.appendChild($movieTitle);

  const $moviePoster = document.createElement('img');
  $moviePoster.setAttribute('src', './images/placeholder-image-2-3.png');
  $moviePosterBox.appendChild($moviePoster);

  $movieList.appendChild($movieListItem);
}

// let targetURL = '';
// function encodeURIComponent(string) {
//   const uri = 'https://lfz-cors.herokuapp.com/?url=';
//   targetURL = uri + 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';
// }

// function movieByTitle() {
//   const xhr = new XMLHttpRequest();
//   xhr.withCredentials = true;
//   xhr.setRequestHeader('accept', 'application/json');
//   xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmQwZGQ1MGI5MzViZjM3NzkyMWE3ZTA2OGFjY2VjNSIsInN1YiI6IjY1MTViNzcyZWE4NGM3MDBhZWU4ODI0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1LFt7yZr-QHp66Wims95ri7xuVOFeHDZMj0tIYzLixY');
//   xhr.open('GET', targetURL + term);
//   xhr.responseType = 'json';
//   xhr.send();
// }
