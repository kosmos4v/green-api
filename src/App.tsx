import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from '../src/pages/Login';
import Home from '../src/pages/Home';



function App() {
  return (
      <Provider store={store} >
        <Router>
          <Routes>
            <Route path='/' element={<Login />}/>
            <Route path='/home' element={<Home />}/>
          </Routes>
        </Router>
      </Provider>
  );
}

export default App;
