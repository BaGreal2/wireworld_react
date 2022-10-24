import Schema from "./Schema";

function List(props) {
  return (
    <div className="schemas-wrapper">
      {props.schemas.map((schema) => {
        return (
          <Schema
            key={schema.id}
            title={schema.title}
            description={schema.description}
            creator={schema.creator}
            rating={schema.rating}
          ></Schema>
        );
      })}
    </div>
  );
}

export default List;
