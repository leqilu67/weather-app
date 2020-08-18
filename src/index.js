import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './index.css';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
const curDay = 0;

function WeatherCard({day, high, low, weather, to}) {
  let imageSrc = "https://img.icons8.com/dusk/64/000000/" + weather + ".png";
  let displayDay = days[curDay+day];
  console.log(to)

  return (
    <Link to={to}>
      <div className = "card">
        <div className = "card-content">
          <span> {displayDay} </span>
          <br />
          <img src= {imageSrc}/>
          <br />
          <span> {high} </span>
          <span>/</span>
          <span> {low} </span>
        </div>
      </div>
    </Link>
  )
}

function DisplayHourlyStat({day}) {
  return <p>DISPLAYING {days[curDay+day]}</p>
}

function WeatherApp() {

  return (
    <Router>
      <div className="weather-app">
        <WeatherCard day={0} high={77} low={68} weather={"sun"} to="/Sun" />
        <WeatherCard day={1} high={77} low={68} weather={"partly-cloudy-day"} to="/Mon"/>
        <WeatherCard day={2} high={77} low={68} weather={"cloud"} to="/Tue"/>
        <WeatherCard day={3} high={77} low={68} weather={"rain"} to="/Wed"/>
        <WeatherCard day={4} high={77} low={68} weather={"snow"} to="/Thur"/>

        <Switch>
          <Route exact path="/Sun">
            <DisplayHourlyStat day={0}/>
          </Route>
          <Route path="/Mon">
            <DisplayHourlyStat day={1}/>
          </Route>
          <Route path="/Tue">
            <DisplayHourlyStat day={2}/>
          </Route>
          <Route path="/Wed">
            <DisplayHourlyStat day={3}/>
          </Route>
          <Route path="/Thur">
            <DisplayHourlyStat day={4}/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}


ReactDOM.render(
  <WeatherApp />,
  document.getElementById('root')
);
