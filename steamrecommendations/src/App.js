import React from 'react';
import Header from './common/header/index.js';
import Footer from './common/footer/index.js';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './pages/home';
import Detail from './pages/detail';
import Nav from './pages/nav';
import Search from './pages/search';
import Login from './pages/login';


function App() {
  return (
    <div>
      <Header />
          <BrowserRouter>
          <div>
            <Route path = '/' exact component = {Home}></Route>
            <Route path = '/nav' exact component = {Nav}></Route>
            <Route path = '/search' exact component = {Search}></Route>
            <Route path = '/detail' exact component={Detail}></Route>
            <Route path = '/login' exact component={Login}></Route>
          </div>
        </BrowserRouter>
        
    <Footer />

    </div>
    
  );
}

export default App;
