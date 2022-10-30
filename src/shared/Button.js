function Button(props) {
  return (
    <>
      <button id={props.id} className={props.classname} onClick={props.action}>
        {props.text ? <span>{props.text}</span> : <></>}
        {props.children ? props.children : <></>}
      </button>
    </>
  );
}

export default Button;
