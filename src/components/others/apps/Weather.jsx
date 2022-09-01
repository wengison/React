import React, {useState, useEffect} from 'react';
import './Weather.css';
import Card from 'react-bootstrap/Card';

function Weather() {

    const [weather, setWeather] = useState('');
    const [city, setCity] = useState('');
    const apiKey = 'b41bbbf4923a2d8d44fb03e8a0075bf9';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;
    
    const cardWeather = document.querySelector('.card-weather');
    const cardCity = document.querySelector('.card-city-h1');
    let img = 'cloudy.jpg'
    let result = '';
    const myCall = ()=> {
        if(city!=='') {
            fetch(url)
            .then(response=>response.json())
            .then(data=>{
                result = Math.round(data.main.temp)
                setWeather(result+'°C')
                cardCity.innerHTML = city.toUpperCase();
                cardWeather.style.display = 'block';
                // cardWeather.style.background = `url(cloudy.jpg)`;
                setCity('');
            })
        }
    }

    const Enter = (event) => {
        if(event.key==='Enter') {
            myCall()
        }
    }


    setTimeout(()=>{
        document.querySelector('.weather-welcome').classList.add('display-none')
    },2000)

    // let temperature = myCall();
    // console.log(temperature);

    

  return (
    <section className='weather-body'>
    <div className='weather-div'>
        <div className='weather-data-box'>
        <h3 className='weather-welcome'>Welcome in React Weather !!</h3>
            <input 
                className='input-city' 
                name='city' type="text" 
                value={city}
                onChange={(e)=>setCity(e.target.value)}
                onKeyPress={Enter}
                placeholder='🔍Enter city...'/>
            <button className='weather-get' onClick={()=>myCall()}>Get</button>
            <Card className='card-weather'>
                <h1 className='card-city-h1'></h1>
                <div className=' card-temp'>{weather} </div>
            </Card>
        </div>
    </div>
    </section>
  )
}

export default Weather