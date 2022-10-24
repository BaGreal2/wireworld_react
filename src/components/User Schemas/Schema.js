import RaitingStars from "./RaitingStars";

function Schema(props) {
  return (
    <div className="schemas-element">
      <div className="schemas-element-sub">
        <div className="schema-text">
          <h2 className="schema-title">{props.title}</h2>
          <p className="schema-description">{props.description}</p>
        </div>
        <button className="schema-load">▶</button>
      </div>
      <div className="creator-rating">
        <p className="schema-creator">By: {props.creator}</p>
        <RaitingStars ratingNum={props.rating}></RaitingStars>
      </div>
    </div>
  );
}

export default Schema;
