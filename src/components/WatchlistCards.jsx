import starIcon from "../img/star-icon.svg";
import addBtn from "../img/add-btn.svg";
import removeBtn from "../img/remove-btn.svg";

function WatchlistCards(props) {
  return (
    <div className="card">
      <img src={`https://image.tmdb.org/t/p/original/${props.imgUrl}`} alt={props.title} className="cardImg"/>
      <div className="card-content">
        <div className="card-first-container">
          <p className="card-title">{props.title}</p>
          <span className="card-rating">
            <img src={starIcon} alt="Star Image" />
            {props.rating}
          </span>
        </div>
        <div className="card-second-container">
          <span className="card-date">{props.date}</span>
          <span className="card-Watchlst-btn">
            <img src={removeBtn} 
                  alt="Remove Button" 
                  onClick={ () => {
                    props.removeFromWatchlist(props.id)
                    props.toggleActive(props.id)
                  }}
            />
            Watchlist
          </span>
        </div>
        <div className="card-third-container">
          {props.plot}
        </div>
      </div>
    </div>
  );
}

export default WatchlistCards;