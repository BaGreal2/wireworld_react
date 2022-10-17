import "./Controls.css";

function Dropdown(props) {
  return (
    <>
      <div className="dropdown main_buttons custom-btn dropbtn">
        <div className="dropdown-content">
          {props.content.map((elem, i) => {
            return (
              <button
                id={elem.id}
                key={i}
                onClick={() => props.onItemChange(elem.value)}
                value={elem.value}
                className="main_buttons custom-btn"
              >
                <span>{elem.text}</span>
              </button>
            );
          })}
        </div>

        <span>{props.title} </span>
        <div className="side-item-text" data-content={props.selected}></div>
      </div>
    </>
  );
}

export default Dropdown;
