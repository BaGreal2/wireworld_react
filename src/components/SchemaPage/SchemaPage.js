import React from "react";
import { useParams } from "react-router-dom";

function SchemaPage(props) {
  const searchParams = useParams();
  return <div>SchemaPage #{searchParams.id}</div>;
}

export default SchemaPage;
