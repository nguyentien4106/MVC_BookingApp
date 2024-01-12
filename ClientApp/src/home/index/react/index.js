import React from 'react'
import ReactDOM from "react-dom/client";
import BookingContainer from './BookingContainer';
import '../css/index.scss'

function App() {

    return (
        <>
            <BookingContainer></BookingContainer>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
