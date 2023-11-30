import React, { useState, useEffect } from "react";
import Search from "./Search";
import axios from "axios";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchCity, setSearchCity] = useState("Toronto");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=6281f220442e423e69279658391902a3`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [searchCity]);

  const handleSearch = (city) => {
    setSearchCity(city);
  };

  const convertKelvin = (kelvin) => {
    var celTemp = kelvin - 273.15;
    return celTemp.toFixed(1);
  };

  const dayOfWeek = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { weekday: "long" };
    return date.toLocaleDateString("en-US", options);
  };

  const getCurrentDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div id="weatherbox">
      <div id="leftbox">
        {weatherData && (
          <div>
            <p>{dayOfWeek(weatherData.dt)}</p>
            <p>{getCurrentDate(weatherData.dt)}</p>
            <p>{weatherData.name}</p>
            <p>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt="Weather icon"
              />
            </p>
            <p>{convertKelvin(weatherData.main.temp)}°C</p>
            <p>{weatherData.weather[0].main}</p>
          </div>
        )}
      </div>
      <div id="rightbox">
        {weatherData && (
          <div id="stats">
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind: {weatherData.wind.speed} km/h</p>
            <p>Air Pressure: {weatherData.main.pressure} mb</p>
            <p>Max Temp: {convertKelvin(weatherData.main.temp_max)}°C</p>
            <p>Min Temp: {convertKelvin(weatherData.main.temp_min)}°C</p>
          </div>
        )}

        <div id="search">
          <Search onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
};

export default Weather;
