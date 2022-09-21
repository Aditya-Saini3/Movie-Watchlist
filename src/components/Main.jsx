import searchIcon from "../img/search-logo.svg";
import React from "react";
import Card from "./Card";

function Main() {
  const [search, setSearch] = React.useState("");
  const [movieData, setMovieData] = React.useState([])

  const fetchData = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=e6305ea18b32503033a373fcf0f75a66&language=en-US&query=${search}&page=1&include_adult=false`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovieData(data.results.map(dta => dta))
        
    } catch (error) {
      console.log("error", error);
    }
  }  
  
  const cards = movieData.map(item => {
    console.log(item)
    return(
      <Card 
        title = {item.title}
        rating = {item.vote_average}
        imgUrl = {item.poster_path}
        date = {item.release_date}
        plot = {item.overview}
      />
    )
  })

  function handleChange(event) {
    setSearch(event.target.value);
  }

  return (
    <div className="container">
        <div className="header-section">
          <div className="headings">
              <h1 className="app-title">Find your film</h1>
              <h3 className="app-subtitle">My Watchlist</h3>
          </div>
        </div>
        <div className="main-section">
        <div className="searchBar">
            <div className="searchBar-input">
              <img src={searchIcon} alt="searchIcon" className="search-icon" />
              <input
                  type="text"
                  placeholder="search"
                  className="search-input"
                  onChange={handleChange}
                  value={search}
              />
              </div>
              <button className="searchBar-btn" onClick={() => fetchData()}>
              Search
              </button>
          </div>
            <div className="card-section">
              {cards}
            </div>
        </div>
    </div>
  );
}

export default Main;
