import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import axios from 'axios';
import './css/index.css';

const APPID = "ace4515cfe6e2a83b39a656a7a3e1f82";
const UNIT = "imperial";
const LOCATION = "94538";

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
const curDay = 0;

function WeatherCard({day, high, low, weather, to, curTemp}) {
  let imageSrc = "http://openweathermap.org/img/wn/" + weather + "@2x.png";
  let displayDay = days[(new Date().getDay()+day)%7];

  return (
    <Link to={to}>
      <div className = "card">
        <div className = "card-content">
          <span> {displayDay} </span>
          <br />
          <img className="icon" src= {imageSrc} alt="/"/>
          <br />
          <span> {high} </span>
          <br />
          <span> {low} </span>
        </div>
      </div>
    </Link>
  )
}

function DisplayHourlyStat({day, unit}) {

  const [hourly, setHourly] = React.useState([]);

  const convertTime = function(unixTime) {
    let date = new Date(unixTime * 1000);
    let hr = date.getHours();
    let min = "0" + date.getMinutes();
    let ending = (hr < 12) ? "am" : "pm";
    hr = (hr < 12) ? hr : hr - 12;

    let formattedTime = hr + ':' + min.substr(-2) + " " + ending;
    return formattedTime;
  }

  const showUnit = function() {
    if (unit == 'imperial') {
      return 'F';
    } else {
      return 'C';
    }
  }

  React.useEffect(() => {
    axios.get('http://api.openweathermap.org/data/2.5/forecast?lat=33.68&lon=-117.83&units='+unit+'&APPID='+APPID)
      .then(res => {
        let selectedDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * day);
        let date_of_selectedDay = selectedDay.getDate();
        let currentHour = selectedDay.getHours();

        const unixTimeStamp = res.data.list;
        let forecasts = [];

        for (let i = 0; i < unixTimeStamp.length; i++) {
          let date = new Date(unixTimeStamp[i].dt * 1000);
          if (date.getDate() !== date_of_selectedDay) continue;
          else {
            unixTimeStamp[i].dt = convertTime(unixTimeStamp[i].dt);
            forecasts.push(unixTimeStamp[i]);
          }
        }
        setHourly(forecasts);
      })
      .catch(errors => {
        console.log("ERROR IN HOURLY!", errors);
      });
  }, [day, unit]);

  return (
    <table>
      <thead>
      <tr>
        <th className="time">Time</th>
        <th className="temp">Temp ({showUnit()})</th>
      </tr>
      </thead>
      <tbody>
        {hourly.map((hourly, index) => (
        <tr key={index}>
          <td>{hourly.dt}</td>
          <td>{Math.round(hourly.main.temp)}</td>
        </tr>
        ))}
      </tbody>
    </table>
  );
}

function WeatherApp() {
  const [curTemp, setCurTemp] = React.useState([]);
  const [forecasts, setForecast] = React.useState([]);
  const [hourly, setHourly] = React.useState([]);
  const [unit, setUnit] = React.useState('imperial');

  React.useEffect(() => {
    axios.get('http://api.openweathermap.org/data/2.5/onecall?lat=33.68&lon=-117.83&units='+unit+'&exclude=minutely&APPID='+APPID)
      .then(res => {
          const currentData = res.data.current;
          setCurTemp(currentData);
          const forecastData = res.data.daily.slice(0,5);
          setForecast(forecastData);
          const hourlyData = res.data.hourly;
        })
      .catch(errors => {
        console.log("ERROR IN WEATHERAPP!", errors);
      })
  }, [unit]);

  return (
    <Router>
      <div className="weather-app">
        <p className="current-temp">Current Temperature: {Math.round(curTemp.temp)} </p>
        <p className="units">
          <span onClick={()=>{
            setUnit('imperial');
            //console.log('F');
          }}>&#176; F </span>
           |
          <span onClick={()=>{
            setUnit('metric');
            //console.log('C');
          }}>&#176; C </span>
        </p>
        <div className="all-cards">
          {forecasts.map((forcast, index) => (
            <WeatherCard key={index}
              day={index}
              high={parseInt(forcast.temp.max)}
              low={parseInt(forcast.temp.min)}
              weather={forcast.weather[0].icon}
              to={"/"+index} />
          ))}
        </div>

        <Switch>
          <Route path="/0">
            <DisplayHourlyStat day={0} unit={unit}/>
          </Route>
          <Route path="/1">
            <DisplayHourlyStat day={1} unit={unit}/>
          </Route>
          <Route path="/2">
            <DisplayHourlyStat day={2} unit={unit}/>
          </Route>
          <Route path="/3">
            <DisplayHourlyStat day={3} unit={unit}/>
          </Route>
          <Route path="/4">
            <DisplayHourlyStat day={4} unit={unit}/>
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
