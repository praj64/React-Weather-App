import React from 'react';
import { useState } from 'react';
import axios from 'axios';


function Weather() {
    const [query, setQuery] = useState();
    const [weather, setWeather] = useState({
        data: {},
        error: false,
    });

    const toDate = () => {
        // let date = new Date();
        // const today = date.toDateString();
        // return today;
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        const currentDate = new Date();
        const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]
            }`;
        return date;
    };

    const search = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setQuery('');
            setWeather({ ...weather });
            const url = 'https://api.openweathermap.org/data/2.5/weather';
            const appid = '93768c2b81a845629c39cf9da4d9d2ca';
            //console.log('Enter');

            await axios
                .get(url, {
                    params: {
                        q: query,
                        units: 'metric',
                        appid: appid,
                    },
                })
                .then((res) => {
                    console.log('res', res);
                    setWeather({ data: res.data, loading: false, error: false });
                })
                .catch((error) => {
                    setWeather({ ...weather, data: {}, error: true });
                    setQuery('');
                    console.log('error', error);
                });
        }
    };

    return (
        <div>
            <h1 className="app-name">
                Weather App<span>🌤</span>
            </h1>
            <div className="search-bar">
                <input
                    type="text"
                    className="city-search"
                    placeholder="Search City.."
                    name="query"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyPress={search}
                />
            </div>
            {weather.error && (
                <>
                    <br />
                    <br />
                    <span className="error-message">
                        <span style={{ 'font-size': '20px' }}> Sorry, City not found</span>
                    </span>
                </>
            )}

            {weather && weather.data && weather.data.main && (
                <div>
                    <div className="city-name">
                        <h2>
                            {weather.data.name}, <span>{weather.data.sys.country}</span>
                        </h2>
                    </div>
                    <div className="date">
                        <span>{toDate()}</span>
                    </div>
                    <div className="icon-temp">
                        <img
                            className=""
                            src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                            alt={weather.data.weather[0].description}
                        />
                        {Math.round(weather.data.main.temp)}
                        <sup className="deg">&deg;C</sup>
                    </div>
                    <div className="des-wind">
                        <p>{weather.data.weather[0].description.toUpperCase()}</p>
                        <p>Wind Speed: {weather.data.wind.speed}m/s</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Weather;