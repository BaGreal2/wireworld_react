import List from "./List";
import Topbar from "../Topbar/Topbar";
import "./styles/User Schemas.css";

function SchemasPage(props) {
  return (
    <>
      <Topbar
        theme_func={props.toggleTheme}
        lang_func={props.toggleLang}
        needTitle={true}
      ></Topbar>
      <List schemas={props.schemas}></List>
    </>
  );
}

export default SchemasPage;
