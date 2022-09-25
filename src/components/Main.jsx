import searchIcon from "../img/search-logo.svg";
import React from "react";
import Card from "./Card";
import Header from "./Header";
import Watchlist from "./Watchlist";

function Main() {
  const [search, setSearch] = React.useState("");
  const [movieData, setMovieData] = React.useState([]);
  const [watchlist, setWatchlist] = React.useState(false);
  const [empty, setEmpty] = React.useState(false);

  const fetchData = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=e6305ea18b32503033a373fcf0f75a66&language=en-US&query=${search}&page=1&include_adult=false`;
    try {
      const response = await fetch(url);
      console.log(response.status)
      const data = await response.json();
      if (!data.results.length) {
        setEmpty(true)
      } else {
        setEmpty(false)
      }

      setMovieData(data.results.map((dta) => ({ ...dta, active: false })))
        
    } catch (error) {
      alert("Unable to get Data, Kindly add some text in the search to get results or check your internet connection or try again after some time.")
      console.log("error", error);
    }
  }  

  const cards = movieData.map(item => {
    return(
      <Card 
        id = {item.id}
        title = {item.title}
        rating = {item.vote_average}
        imgUrl = {item.poster_path}
        date = {item.release_date}
        plot = {item.overview}
        active = {item.active}
        addToWatchlist = {addToWatchlist}
        watchlist = {watchlist}
        toggleActive = {toggleActive}
      />
    )
  })
  function toggleWatchlist() {
    setWatchlist(prev => !prev);
  }
  function addToWatchlist(id) {
    movieData.map(movie => {
        if(movie.id === id) {
          localStorage.setItem(`${movie.id}`, JSON.stringify(movie))
        }
      }
    )
  }

  function toggleActive(id) {
    setMovieData(movies => movies.map(movie => {
      return movie.id === id ? 
          {...movie, active: !movie.active} :
          movie
  }))
  }

  function handleChange(event) {
    setSearch(event.target.value);
  }

  return (

    <div className="container">
        <Header toggle = {toggleWatchlist} appTitle = {!watchlist ? "Find your film" : "Watchlist"} appSubtitle = {!watchlist ? "Watchlist" : "Find your film"}/>
        {!watchlist ?
        <div className="main-section">
          <div className="searchBar">
              <div className="searchBar-input">
                <img src={searchIcon} alt="searchIcon" className="search-icon" />
                <input
                    type="text"
                    placeholder="Type here to search"
                    className="search-input"
                    onChange={handleChange}
                    value={search}
                />
                </div>
                <button className="searchBar-btn" onClick={() => fetchData()}>
                Search
                </button>
            </div>
            { empty ?
                <div className="noMovie">
                  <p>No Match Found, Try Searching with some other Keyword.</p>
                </div> 
                :
                <div className="card-section">
                  {cards}
                </div>
            }
        </div>
        :
        <Watchlist
          addToWatchlist={addToWatchlist}
          watchlist={watchlist} 
          toggleActive={toggleActive}
          toggleWatchlist={toggleWatchlist}
        />
        }
    </div>
  );
}

export default Main;
