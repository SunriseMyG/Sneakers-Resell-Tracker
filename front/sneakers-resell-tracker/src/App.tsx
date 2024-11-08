import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/home/home';
import Header from './components/header/header';

function App() {

  const [pageindex, setPageIndex] = React.useState(0);

  return (
    <div className="App">
      <Header setPageIndex={setPageIndex} />
      {pageindex === 0 && (
        <Home setPageIndex={setPageIndex} />
      )}
    </div>
  );
}

export default App;