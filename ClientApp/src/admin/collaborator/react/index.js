import React from "react";
import CollaboratorContainer from "./CollaboratorContainer";
import ReactDOM from "react-dom/client";
import "../css/index.scss"

function App () {
    return <CollaboratorContainer />;
}
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);