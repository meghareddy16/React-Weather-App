import React, { useEffect, useState, useRef} from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './Weather-app.css';
import searchIcon from "../assets/search.png";
import clearIcon from "../assets/clear.png";
import humidityIcon from "../assets/humidity.png";
import windIcon from "../assets/wind.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import drizzleIcon from "../assets/drizzle.png";
import cloudIcon from "../assets/cloud.png";

const API_Key = "47e1f1816490ba0094c5e2878faa850e";

function Weather() {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;

  const allIcons = {
    "01d": rainIcon,
    "01n": clearIcon,
    "02d": snowIcon,
    "02n": cloudIcon,
    "03d": clearIcon,
    "03n": snowIcon,
    "04d": cloudIcon,
    "04n": clearIcon,
    "09d": drizzleIcon,
    "09n": rainIcon,
    "10d": clearIcon,
    "10n": drizzleIcon,
    "11d": clearIcon,
    "11n": rainIcon,
    "13d": cloudIcon, 
    "13n": drizzleIcon,
    "50d": snowIcon,
    "50n": cloudIcon
  }

  const Search = async (city) => {

    if(city === "")
    {
      toast.error("Please enter a city name");
      return;
    }

    try{
      
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_Key}`);
          const data = await response.json();
          console.log(data);
          
          if (data.cod === 404 || data.cod === "404") {
            toast.error("City not found");
            return;
          }

          //if u want to use custom icons from assets folder uncomment below lines and comment the icon line in setWeatherData
          const icons = allIcons[data.weather[0].icon];
          setWeatherData({
            // If you want to display temperature in Fahrenheit use below line
            // temperature: Math.round(data.main.temp - 273.15) * 9/5 + 32,
            temperature: Math.floor(data.main.temp),
            location: `${data.name}`,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            description: data.weather[0].main,
            icon: data.weather[0].icon,
            // icon: icons
          })
           
    }catch(error){
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    Search("Bangalore");
  }, []);

  return (
    <div className="weather">
      <ToastContainer />
      <div className="search-bar">
        <input type="text" placeholder="Search" name="city" ref={inputRef} />
        <img src={searchIcon} alt="Search" onClick={()=>Search(inputRef.current.value)}/>
      </div>
      <div className="main-weather">
        <img src={iconUrl} alt="Weather Icon" />
        {/* <img src={weatherData.icon} alt="Weather Icon" /> */}
        <h1 className="temperature">{weatherData.temperature}°C</h1>
        <p className="location">{weatherData.location}</p>
      </div>
      <div className="details">
        <div className="col">
            <img src={humidityIcon} alt="Humidity Icon" />
            <div className="weather-humidity">
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={windIcon} alt="Wind Speed Icon" />
            <div className="weather-wind">
                <p>{weatherData.windSpeed} mph</p>
                <span>Wind Speed</span>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;