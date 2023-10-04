const $submit = document.querySelector('#film-search');
const $searchTerm = document.querySelector('#film-search-input');

$submit.addEventListener('submit', captureSearch);
let term = '';
// const movieData = {};
function captureSearch(event) {
  event.preventDefault();
  term = replaceSpaces($searchTerm.value);
  const searchURL = encodeURIComponent(term);
  movieByTitle(searchURL);

  // for (let i = 0; i < movieObj.results.length; i++) {
  //   movieData = {
  //     id: results.results[i].id,
  //     title: results[i].origional_title,
  //     poster: results[i].poster_path
  //   };
  // }

}

// const $movieList = document.querySelector('#render-list');

// render list items
// function renderMovies(movieData) {
//   const $movieListItem = document.createElement('li');
//   $movieListItem.setAttribute('class', 'column-full column-half no-wrap card');
//   $movieList.appendChild($movieListItem);

//   const $moviePosterBox = document.createElement('div');
//   $moviePosterBox.setAttribute('class', 'poster a-center');
//   $movieListItem.appendChild($moviePosterBox);

//   const $movieTitleBox = document.createElement('div');
//   $movieTitleBox.setAttribute('class', 'column-half a-center');
//   $movieListItem.appendChild($movieTitleBox);

//   const $movieTitle = document.createElement('div');
//   $movieTitle.textContent = 'Movie Title and the Movies\'s Title';
//   $movieTitleBox.appendChild($movieTitle);

//   const $moviePoster = document.createElement('img');
//   $moviePoster.setAttribute('src', './images/placeholder-image-2-3.png');
//   $moviePosterBox.appendChild($moviePoster);

//   $movieList.appendChild($movieListItem);
// }

function encodeURIComponent(string) {
  const uri = 'https://lfz-cors.herokuapp.com/?url=';
  const targetURL = uri + `https://api.themoviedb.org/3/search/movie?query=${string}&include_adult=true&language=en-US&page=1`;
  return targetURL;
}

function movieByTitle(string) {
  let movieObj;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', string);
  xhr.setRequestHeader('accept', 'application/json');
  xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmQwZGQ1MGI5MzViZjM3NzkyMWE3ZTA2OGFjY2VjNSIsInN1YiI6IjY1MTViNzcyZWE4NGM3MDBhZWU4ODI0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1LFt7yZr-QHp66Wims95ri7xuVOFeHDZMj0tIYzLixY');
  xhr.addEventListener('load', function () {
    movieObj = JSON.parse(xhr.responseText);
    // console.log(movieObj);
  }
  );
  xhr.send();
  return movieObj;
}

function replaceSpaces(string) {
  const regex = / /gi;
  const newString = string.replace(regex, '%20');
  return newString;
}
