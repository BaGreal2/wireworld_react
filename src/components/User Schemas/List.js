import React from "react";
import Schema from "./Schema";

function List(props) {
  return (
    <div className="schemas-wrapper">
      {props.schemas.map((schema) => {
        return (
          <Schema
            key={schema._id}
            id={schema._id}
            title={schema.title}
            description={schema.description}
            creator={schema.creator}
            rating={
              schema.rating.length > 1
                ? schema.rating.reduce((partSum, a) => partSum + a, 0) /
                  schema.rating.length
                : 0
            }
            showDelete={schema.creator === localStorage.getItem("username")}
            update={props.update}
            updateList={props.updateList}
          ></Schema>
        );
      })}
    </div>
  );
}

export default List;
