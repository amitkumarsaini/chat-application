import React from 'react';
import './App.css';
import Home from './components/home';
import { Provider } from "react-redux";
import store from './Redux/Store';

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>

  )
}

export default App;
