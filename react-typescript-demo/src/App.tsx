import React from 'react';
import {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const URL = "https://weather.com/weather/hourbyhour/l/Dublin+CA?canonicalCityId=7b8e90229d778a1ec17f569e8e4de9b54c1ab92b976f1d55cbdd54d8164054ed";
function App() {
  const[temp, setTemp] = useState(0)
  useEffect(() => {
    const fetchData = async() => {
      const result = await fetch(URL)
      console.log(result)
    }
    fetchData();
  })
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
