import React from 'react';
import './Weather.css';
import Card from 'react-bootstrap/Card';

function Weather() {

    let lat = 33.44;
    let lon = -94.04;
    const apiKey = 'b41bbbf4923a2d8d44fb03e8a0075bf9';
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${apiKey}`;

    let result = '';
    const myCall = ()=> {
        fetch(url)
            .then(res=>result = res.json())
            .then(console.log(result))
    }


  return (
    <div className='weather-div'>
        <div className='weather-data-box'>
            <Card className='mb-3'>
                
            </Card>
            <button onClick={()=>myCall()}>Get</button>
        </div>
    </div>
  )
}

export default Weather