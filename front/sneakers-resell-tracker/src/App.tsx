import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/home/home';
import Header from './components/header/header';
import Items from './components/items/items';

function App() {

  const [pageindex, setPageIndex] = React.useState(0);
  const [scu, setScu] = React.useState('');
  const [searchItem, setSearchItem] = React.useState("");

  return (
    <div className="App">
      <Header
        setPageIndex={setPageIndex}
        setSearchItem={setSearchItem}
      />
      {pageindex === 0 && (
        <Home
          setPageIndex={setPageIndex}
          setScu={setScu}
          searchItem={searchItem}
        />
      )}
      {pageindex === 1 && (
        <Items
          setPageIndex={setPageIndex}
          scu={scu}
        />
      )}
      
    </div>
  );
}

export default App;