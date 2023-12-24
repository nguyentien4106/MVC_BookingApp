import React from "react";
import CollaboratorContainer from "./CollaboratorContainer";
import ReactDOM from "react-dom/client";
import "../css/collaborator/index.scss"
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function App () {
    return  <>
                <ReactNotifications />
                <CollaboratorContainer />
            </>
}
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
