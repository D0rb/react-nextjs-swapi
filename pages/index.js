import React, { useState, useEffect } from "react";
let currentFilm;
// fetch data from api;
export const getStaticProps = async () => {
  const res = await fetch('https://swapi.dev/api/films/?format=json');
  const data = await res.json();
  return {
    props: { films: data }
  }
}

// create film  list and render it
const films = ({ films }) => {


  // setters for state variables
  const [movieTitle, setTxt_MovieTitle] = useState("");
  const [movieDesc, setTxt_MovieDesc] = useState("");
  const [favStar, setTxt_Fav] = useState("")
  const [producer, setTxt_producer] = useState("");
  const [director, setTxt_director] = useState("")
  const [info, setTxt_info] = useState("")
  const [release_date, setTxt_release_date] = useState("")

  // onclick button event to load film info
  const selectMovieOnClick = (films) => {
    let star = ''
    currentFilm = films;
    const favisOn = '⭐ You Liked this movie!';
    const favisOff = '✰';

    // check if movie is in fav list 
    if(localStorage.getItem(films.title)==="true"){
      star = favisOn
    }else{
      star = favisOff
    } 

    setTxt_Fav(star);
    setTxt_MovieTitle(currentFilm.title);
    setTxt_MovieDesc(currentFilm.opening_crawl)
    setTxt_director(currentFilm.director)
    setTxt_producer(currentFilm.producer)
    setTxt_release_date(currentFilm.release_date)
    setTxt_info("This movie contains:  " + currentFilm.characters.length + " characters , "+currentFilm.planets.length + " planets , "+currentFilm.starships.length + " starships and "+currentFilm.vehicles.length + " vehicles") 
    return star;
  }

  // onclick event button set favoriate film  to local storage
  const favStarOnClick = () => {
    let star = ''
    const favisOn = '⭐';
    const favisOff = '✰';
    if(localStorage.getItem(currentFilm.title)==="true"){
      star = favisOff
      localStorage.setItem(currentFilm.title,"false");

    }else{
      star = favisOn
      localStorage.setItem(currentFilm.title,"true");

    } 

    setTxt_Fav(star);
  }
    return(
        <div>
          <div class="split left">
      <div class="centered">
      {films.results.map(film => (
        <div key={film.episode_id}>
          <button class="button" onClick={() => selectMovieOnClick(film)}>{film.title}</button>
        </div>
      ))}
      </div>
    </div>
    render()
    <div class="split right">
      <div class="centered">
      <div class="row justify-content-center mt-20">
      <span class="star" onClick={() =>favStarOnClick()}>{favStar}</span>
        <h2>{movieTitle}</h2>
        <h3>{release_date}</h3>
        <h3>{movieDesc}</h3>
        <h2>{director} {producer}</h2>
        <h3>{info}</h3>
      </div>
    </div> 
    </div> 
    </div>

  );
  
}

export default films;
