import React from 'react'
import ReactDOM from "react-dom/client";
import BookingContainer from './BookingContainer';
import { ReactNotifications } from 'react-notifications-component'
import '../css/index.scss'
import 'react-notifications-component/dist/theme.css'

function App() {

    return (
        <>
            <ReactNotifications/>
            <BookingContainer></BookingContainer>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
