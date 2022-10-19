function Schema(props) {
  return (
    <div className="schemas-element">
      <div className="schema-text">
        <h2 className="schema-title">{props.title}</h2>
        <p className="schema-description">{props.description}</p>
        <p className="schema-creator">By: {props.creator}</p>
      </div>
      <button className="schema-load">▶</button>
    </div>
  );
}

export default Schema;
