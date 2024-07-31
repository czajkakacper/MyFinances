import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './components/Main/App.js';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


// import Login from './components/Login';
// import Signup from './components/Signup';
// import Main from './components/Main';

// <Routes>
//   <Route path='/' element={<Navigate replace to="/main" />} />
//   <Route path="/signup" element={<Signup />} />
//   <Route path="/main" element={<Main />} />
//   <Route path="/login" element={<Login />} />
// </Routes>