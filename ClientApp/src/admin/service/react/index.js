import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/index.scss';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import ServiceContainer from './ServiceContainer';

function App() {
  return (
    <>
      <ReactNotifications />
      <ServiceContainer />
    </>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
