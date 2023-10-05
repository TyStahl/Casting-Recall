/* global movieData */

const $submit = document.querySelector('#film-search');
const $searchTerm = document.querySelector('#film-search-input');

$submit.addEventListener('submit', captureSearch);

function captureSearch(event) {
  event.preventDefault();
  let term = '';
  $movieList.textContent = '';
  term = replaceSpaces($searchTerm.value);
  const searchURL = encodeURIComponent(term);
  movieByTitle(searchURL);
}

const $movieList = document.querySelector('#render-list');

// render list items
function renderMovies(renderData) {
  const $movieListItem = document.createElement('li');
  $movieListItem.setAttribute('class', 'column-full column-half no-wrap card');
  $movieListItem.setAttribute('id', renderData.id);
  $movieList.appendChild($movieListItem);

  const $moviePosterBox = document.createElement('div');
  $moviePosterBox.setAttribute('class', 'poster a-center');
  $movieListItem.appendChild($moviePosterBox);

  const $movieTitleBox = document.createElement('div');
  $movieTitleBox.setAttribute('class', 'column-half a-center');
  $movieListItem.appendChild($movieTitleBox);

  const $movieTitle = document.createElement('div');
  $movieTitle.textContent = renderData.title;
  $movieTitleBox.appendChild($movieTitle);

  const $moviePoster = document.createElement('img');
  $moviePoster.setAttribute(
    'src',
    `http://image.tmdb.org/t/p/original${renderData.posterUrl}`
  );
  $moviePoster.setAttribute('alt', renderData.title);
  $moviePosterBox.appendChild($moviePoster);

  $movieList.appendChild($movieListItem);
}

function encodeURIComponent(string) {
  const uri = 'https://lfz-cors.herokuapp.com/?url=';
  const targetURL =
    uri +
    `https://api.themoviedb.org/3/search/movie?query=${string}&include_adult=true&language=en-US&page=1`;
  return targetURL;
}

function movieByTitle(string) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', string);
  xhr.responseType = 'json';
  xhr.setRequestHeader(
    'Authorization',
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmQwZGQ1MGI5MzViZjM3NzkyMWE3ZTA2OGFjY2VjNSIsInN1YiI6IjY1MTViNzcyZWE4NGM3MDBhZWU4ODI0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1LFt7yZr-QHp66Wims95ri7xuVOFeHDZMj0tIYzLixY'
  );
  xhr.addEventListener('load', function () {
    const response = xhr.response;
    movieData.movies = response.results;
    for (let i = 0; i <= movieData.movies.length; i++) {
      const renderData = {
        id: movieData.movies[i].id,
        title: movieData.movies[i].original_title,
        posterUrl: movieData.movies[i].poster_path
      };
      renderMovies(renderData);
    }
  });
  xhr.send();
}

function replaceSpaces(string) {
  const regex = / /gi;
  const newString = string.replace(regex, '%20');
  return newString;
}
