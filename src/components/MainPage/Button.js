import "./style/Controls.css";

function Button(props) {
  return (
    <>
      <button id={props.id} className={props.classname} onClick={props.action}>
        <span>{props.text}</span>
      </button>
    </>
  );
}

export default Button;
