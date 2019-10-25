import React from 'react';
import Header from './common/header/index.js';
import {BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <div>
          <Route path = '/' exact render={()=><div>home</div>}></Route>
          <Route path = '/detail' exact render={()=><div>detail</div>}></Route>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
