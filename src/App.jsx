import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCloud, FaCloudMoonRain, FaCloudRain, FaCloudSun, FaSnowflake, FaSun, FaWind } from "react-icons/fa";
import { TiWeatherSunny } from "react-icons/ti";
import { FaTemperatureHigh } from "react-icons/fa";
import { BsFillCloudsFill } from 'react-icons/bs';
import { WiHumidity } from 'react-icons/wi';
import Intro from './assets/intro/Intro';
import "./App.css"
import LoginForm from './assets/intro/LoginForm';
import Header from './assets/intro/Header';

const App = () => {
  const [cityName, setCityName] = useState("")
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredStates, setFilteredStates] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=EUEQ4LDRZAS7HY2ZSJTVV76JD&contentType=json`
        );
        setWeatherData(response.data);
      } catch (error) {
        setError('Error fetching weather data');
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [cityName]);

  const handleChange = (e) => {
    const value = e.target.value;
    setCityName(value);
    const filtered = indianStates.filter((state) =>
      state.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStates(filtered);
    setShowDropdown(true);
  };


  const userData = JSON.parse(localStorage.getItem('weatherUserProfile'));

  useEffect(() => {
    if(!userData) {
      setShowLoginForm(false);
    }
  }, [userData])

  return (
    <>
      {
        !showLoginForm ? (
          <LoginForm onClose={() => setShowLoginForm(true)} />
        ) : <>
          {
            userData ? <h1 className='mt-[170px]'></h1> : null
          }
          <div className='h-[auto] w-[88%] mt-10 shadow-lg bg-[linear-gradient(-35deg,_#000428,_#004e92)] shadow-black ml-[6%] p-3 mb-0 text-white rounded-md' >
            <h3 className="text-center text-lg font-semibold ">
              {new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </h3>

            <div className="relative w-[100%]   mx-auto mt-3">
              <input
                type="text"
                id="city"
                value={cityName}
                onChange={handleChange}
                placeholder=" "
                className="peer  w-full bg-transparent border-b-2 border-white text-white placeholder-transparent focus:outline-none focus:border-cyan-400 pt-6 pb-1 px-2 "
              />
              <label
                htmlFor="city"
                className="absolute left-2 top-2 text-white text-sm transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-focus:top-2 peer-focus:text-sm peer-focus:text-cyan-400"
              >
                Search State Name
              </label>
            </div>
            {
              weatherData ? <div className='md:flex gap-10'>
                <div className='w-[100%] h-[100%] mt-3'>
                  <h2 className='text-center text-[1rem] md:text-[1.3rem] font-[700]'>CURRENT WEATHER</h2>
                  <div className='flex items-center justify-between'>
                    <h4 className='text-[0.7rem]  md:text-[1.1rem] font-[700] text-center'>{weatherData?.resolvedAddress}<br />
                      <span className='text-[0.6rem] md:text-[0.8rem] font-[500]'>
                        Today {new Date().getDate()} {new Date().toLocaleString('default', { month: 'short' })}
                      </span>
                    </h4>
                    <h4 className='text-[0.8rem] md:text-[1.1rem] font-[700] text-center'>{weatherData?.currentConditions.temp} °C <br />
                      <span className='text-[0.6rem] md:text-[0.8rem] font-[500]'>{weatherData?.currentConditions.conditions}</span>
                    </h4>
                    {
                      weatherData?.currentConditions.icon === "partly-cloudy-day" ? <FaCloudSun className='text-[2rem] md:text-[4rem]' /> :
                        weatherData?.currentConditions.icon === "cloudy" ? <FaCloud className='text-[2rem] md:text-[4rem]' /> :
                          weatherData?.currentConditions.icon === "clear-day" ? <FaSun className='text-[2rem] md:text-[4rem]' /> :
                            weatherData?.currentConditions.icon === "rain" ? <FaCloudRain className='text-[2rem] md:text-[4rem]' /> :
                              weatherData?.currentConditions.icon === "snow" ? <FaSnowflake className='text-[2rem] md:text-[4rem]' /> : <FaSun />
                    }
                  </div>
                  <h2 className='text-center text-[1rem] md:text-[1.3rem] font-[700] mt-4'>AIR CONDITIONS</h2>
                  <div className='flex items-center justify-between mt-3'>
                    <h4 className='text-[0.8rem] md:text-[1.1rem] font-[700] text-center m-0 p-0 leading-[0.8rem] '>
                      <span className='text-[0.8rem] font-[500] flex items-center gap-2'> <FaTemperatureHigh className='text-[0.7rem] md:text-[1rem]' /> Real Feel</span>
                      <br />
                      {weatherData?.currentConditions.temp} °C
                    </h4>
                    <h4 className='text-[0.8rem] md:text-[1.1rem] font-[700] text-center m-0 p-0 leading-[0.8rem] '>
                      <span className='text-[0.8rem] font-[500] flex items-center gap-2'>
                        <FaWind className='text-[0.7rem] md:text-[1rem]' />
                        Wind</span>
                      <br />
                      {weatherData?.currentConditions.windspeed} m/s
                    </h4>
                    <h4 className='text-[0.8rem] md:text-[1.1rem] font-[700] text-center m-0 p-0 leading-[0.8rem] '>
                      <span className='text-[0.8rem] font-[500] flex items-center gap-2'>

                        <BsFillCloudsFill className='text-[0.7rem] md:text-[1rem]' />
                        Clouds</span>
                      <br />
                      {weatherData?.currentConditions.cloudcover}  %
                    </h4>
                    <h4 className='text-[0.8rem] md:text-[1.1rem] font-[700] text-center m-0 p-0 leading-[0.8rem]'>
                      <span className='text-[0.8rem] font-[500] flex items-center gap-2'>
                        <WiHumidity className='text-[1rem] md:text-[1.4rem]' />
                        Humidity</span>
                      <br />
                      {weatherData?.currentConditions.humidity}%
                    </h4>
                  </div>
                  <h2 className='text-center text-[1rem] md:text-[1.3rem] font-[700] mt-4'>TODAY'S FORECAST</h2>
                  <p className='text-[0.6rem] md:text-[0.9rem] text-center text-blue-500 '>4 available forecasts</p>
                  <div className='flex items-center justify-center gap-2 mt-6 px-3'>
                    {
                      weatherData?.days?.[0]?.hours?.slice(2, 6).map((item, i) => (
                        <>
                          <div className=' bg-opacity-1 p-2 md:p-4 rounded-md scrollbar2 flex items-center justify-between flex-col' key={i}>
                            <p className='text-[0.7rem] md:text-[1rem]'>{item?.datetime}</p>
                            {
                              item.icon === "partly-cloudy-day" ? <FaCloudSun className='text-[1rem] md:text-[1.5rem] text-orange-400' /> :
                                item.icon === "cloudy" ? <FaCloud className='text-[1rem] md:text-[1.5rem] text-orange-400' /> :
                                  item.icon === "clear-day" ? <FaSun className='text-[1rem] md:text-[1.5rem] text-orange-400' /> :
                                    item.icon === "rain" ? <FaCloudRain className='text-[1rem] md:text-[1.5rem] text-orange-400' /> :
                                      item.icon === "snow" ? <FaSnowflake className='text-[1rem] md:text-[1.5rem] text-orange-400' /> : <FaSun className='text-[1rem] md:text-[1.5rem] text-orange-400' />
                            }

                            <h4 className='text-[0.7rem] md:text-[1.2rem] font-[700]'>{item?.feelslike} °c</h4>
                          </div>
                        </>
                      ))
                    }
                  </div>
                </div>
                <div className='w-[100%] h-[100%]'>
                  <h2 className='text-center text-[1rem] md:text-[1.3rem] font-[700] mt-2'>WEEKLY FORECAST</h2>
                  <div className=' mt-4 md:mt-0 md:h-[30vw] overflow-y-auto scrollbar '>
                    {
                      weatherData?.days?.slice(0, 6).map((item, i) => (
                        <div className='w-[100%] rounded-md flex items-center justify-between md:mb-4 mb-2  bg-opacity-10 bg-[#ffffff4d] md:p-4 p-2 scrollbar2' key={i}>
                          <div>
                            <h3 className='font-[700] text-[1rem]'>{new Date(item?.datetime).toLocaleDateString('en-US', { weekday: 'long' })}</h3>
                            <p className='flex item-center gap-2 text-[0.7rem] md:text-[1rem]'>
                              {
                                item.icon === "partly-cloudy-day" ? <FaCloudSun className='text-[1rem] md:text-[1.4rem]' /> :
                                  item.icon === "cloudy" ? <FaCloud className='text-[1rem] md:text-[1.4rem]' /> :
                                    item.icon === "clear-day" ? <FaSun className='text-[1rem] md:text-[1.4rem]' /> :
                                      item.icon === "rain" ? <FaCloudRain className='text-[1rem] md:text-[1.4rem]' /> :
                                        item.icon === "snow" ? <FaSnowflake className='text-[1rem] md:text-[1.4rem]' /> : <FaSun />
                              }
                              {item?.conditions}</p>
                          </div>
                          <div>
                            <p className='flex items-center gap-2 text-[0.8rem] md:text-[1.2rem]'>
                              <FaTemperatureHigh className='text-[0.7rem] md:text-[1rem]' /><span> {item?.temp} °C</span>
                            </p>
                            <p className='flex items-center gap-2 text-[0.8rem] md:text-[1.2rem]'>
                              <BsFillCloudsFill /> <span> {item?.cloudcover} %</span>
                            </p>
                          </div>
                          <div>
                            <p className='flex items-center gap-2 text-[0.8rem] md:text-[1.2rem]'>
                              <FaWind className='text-[0.7rem] md:text-[1rem]' /><span>{item?.windspeed} m/s</span>
                            </p>
                            <p className='flex items-center gap-2 text-[0.8rem] md:text-[1.2rem]'>
                              <WiHumidity className='text-[1.5rem]' /><span> {item?.humidity} %</span>
                            </p>
                          </div>
                        </div>
                      ))
                    }
                  </div>

                </div>
              </div> : <div className='h-[83%] mt-[1%] w-[full] flex flex-col items-center justify-center'>
                <FaCloudMoonRain className='text-[14rem] mt-20' />
                <p className='text-[0.8rem] font-[500] mt-7 mb-20'>Explore current weather data and 6-day forecast of more than 200,000 cities!</p>
              </div>
            }
          </div>
        </>
      }

      <Intro />


      {
        showLoginForm && <Header onEdit={() => setShowLoginForm(false)} />
      }




    </>
  );
};

export default App;
