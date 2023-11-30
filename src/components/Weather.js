import React, { Component } from 'react';
import axios from 'axios';
import './weather.css'

export default class Weather extends Component {
    state = {
        dailyWeather: [],
        city: 'Toronto' // default city weather 
    };

    componentDidMount(){
        this.getWeatherData(this.state.city)
    }

    getWeatherData = (city) => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast/?q=${city}&cnt=16&units=metric&appid=788262686f4d7611e670fc6ec15951e4`)
            .then(res => {
                console.log(res.data);
                const dailyWeather = [res.data];
                this.setState({ dailyWeather, city });
            })
            .catch(error => {
                console.log(error);
            });
    }

    cityChange = (e) => {
        this.setState({city: e.target.value})
    }
    
    citySearch = () => {
        this.getWeatherData(this.state.city)
    }

    getDate = (dateText) => {
        return new Date(dateText * 1000).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric' })
    } 
    getTime = (time) => {
       return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  

    render() {
        return (
            <div className='container'>
                <h2>Weather forecast</h2>
                <p>Search City</p> 
                <input type='text' value={this.state.city} onChange={this.cityChange}/>
                <button onClick={this.citySearch}>Search</button>
                {this.state.dailyWeather.map((day, index) => (
                <div className='table' key={index}>
                      <table className='weather'>
                            <thead>
                                <tr>
                                    <th>Date/Time</th>
                                    <th>Temperature</th>
                                    <th>Weather Condition</th>
                                    <th>Humidity (%)</th>
                                    <th>Wind Speed (m/s)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {day.list.map((item, i) => (
                                    <React.Fragment key={i}>
                                        {i === 0 || this.getDate(item.dt) !== this.getDate(day.list[i - 1].dt) ? (
                                            <tr>
                                                <td className='date' colSpan={5}>{this.getDate(item.dt)}</td>
                                            </tr>
                                        ) : null}
                                        <tr>
                                            <td>{this.getTime(item.dt_txt)}</td>
                                            <td>{item.main.temp}</td>
                                            <td>
                                                <span className="weather-info">
                                                    <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} />
                                                    <span>{item.weather[0].description}</span>
                                                </span>
                                            </td>
                                            <td>{item.main.humidity}</td>
                                            <td>{item.wind.speed}</td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                </div>
            ))}
            </div>
        );
    }
}