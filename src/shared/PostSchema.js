import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function PostSchema({ onClick, text, children }) {
  return (
    <Link to="/post" className="auth-redirect-link post-link">
      <Button
        id="post_schema"
        classname={"custom-btn post-btn"}
        text={text}
        action={onClick}
      >
        {children}
      </Button>
    </Link>
  );
}
