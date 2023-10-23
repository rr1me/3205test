import React from 'react';
import './App.css';
import './reset.css';
import Layout from '../pages/Layout';
import { Provider } from 'react-redux';
import store from '../redux/store';

const App = () => (
  <div className="App">
    <Provider store={store}>
      <Layout/>
    </Provider>
  </div>
);

export default App;
