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
            creator={schema.creatorName}
            rating={
              schema.rating.length > 0
                ? schema.rating.reduce((partSum, a) => partSum + a, 0) /
                  schema.rating.length
                : 0
            }
            showDelete={
              schema.creator ===
              JSON.parse(JSON.parse(localStorage.getItem("persist:auth")).user)
                ._id
            }
            update={props.update}
            updateList={props.updateList}
          ></Schema>
        );
      })}
    </div>
  );
}

export default List;
