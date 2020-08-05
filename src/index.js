import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function WeatherCard({day, high, low, weather}) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  const curDay = 0;
  let displayDay = days[curDay+{day}];
  return (
    <div className = "card">
      <div className = "card-content">
        <span> {days[curDay+day]} </span>
        <br />
        <img src="https://img.icons8.com/dusk/64/000000/sun.png"/>
        <br />
        <span> {high} </span>
        <span>/</span>
        <span> {low} </span>
      </div>
    </div>
  )
}

function WeatherApp() {

  return (
    <div className="weather-app">
      <WeatherCard day={0} high={77} low={68} weather={"sunny"} />
      <WeatherCard day={1} high={77} low={68} weather={"sunny"} />
      <WeatherCard day={2} high={77} low={68} weather={"sunny"} />
      <WeatherCard day={3} high={77} low={68} weather={"sunny"} />
      <WeatherCard day={4} high={77} low={68} weather={"sunny"} />
    </div>
  )
}


ReactDOM.render(
  <WeatherApp />,
  document.getElementById('root')
);
