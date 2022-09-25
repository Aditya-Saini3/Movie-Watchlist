import WatchlistCards from "./WatchlistCards"
import React, { useEffect } from "react";
import addBtn from "../img/add-btn.svg"


function Watchlist(props) {
    const data = []
    const [watchlistedMovies, setWatchlistedMovies] = React.useState([]);
    const [empty, setEmpty] = React.useState(false);
    function getWatchlistedMovies() {
        const local = localStorage;
        for(var key in local) {
            if(typeof local[key] === "string") {
                data.push(JSON.parse(local[key]))
            }
        }
        if (!data.length) {
          setEmpty(true) 
        } else {
          setEmpty(false)
        }
        setWatchlistedMovies(
          data.map((result) => {
            return {
              id: result.id,
              title: result.title,
              rating: result.vote_average,
              imgUrl: result.poster_path,
              date: result.release_date,
              plot: result.overview,
              addToWatchlist: props.addToWatchlist,
            }
          })
        )
    }
    
    useEffect(() => {
      getWatchlistedMovies()
    }, [])

    function removeFromWatchlist(id) {
      localStorage.removeItem(`${id}`)
      getWatchlistedMovies()
    }

    const card = watchlistedMovies.map(item => {
        return(
          <WatchlistCards 
            id = {item.id}
            title = {item.title}
            rating = {item.rating}
            imgUrl = {item.imgUrl}
            date = {item.date}
            plot = {item.plot}
            removeFromWatchlist = {removeFromWatchlist}
            watchlist = {true}
            toggleActive = {props.toggleActive}
          />
        )
      })
    return (
        <div className="main-section">
          {empty ?
            <div className="noMovie">
              <p>No Movie watchlisted, Add some</p>
              <img src={addBtn} onClick={() => props.toggleWatchlist()} />
            </div> :
            <div className="card-section">
              {card}
            </div> 
          }
        </div>
    )
}

export default Watchlist;