import React from 'react';
import Header from './common/header/index.js';
import Footer from './common/footer/index.js';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './pages/home';
import Detail from './pages/detail';
function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <div>
          <Route path = '/' exact component = {Home}></Route>
          <Route path = '/detail' exact component={Detail}></Route>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
