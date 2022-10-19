import Schema from "./Schema";

function List(props) {
  console.log(props);
  return (
    <div className="schemas-wrapper">
      {props.schemas.map((schema) => {
        return (
          <Schema
            key={schema.id}
            title={schema.title}
            description={schema.description}
            creator={schema.creator}
          ></Schema>
        );
      })}
    </div>
  );
}

export default List;
