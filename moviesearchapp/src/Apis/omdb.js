export function searchmovie(term){
     return `https://www.omdbapi.com/?apikey=79c5a236&s=${term}`;
}

export function searchmoviebyid(imdbid){
     return `https://www.omdbapi.com/?apikey=79c5a236&i=${imdbid}`;
}

