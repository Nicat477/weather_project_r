import { useState,useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [location, setlocation] = useState('')
  const[weatherdata,setweatherdata]=useState(null)
  useEffect(()=>{
    const fetchdata=async()=>
    {
      try{
        const response=await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&days=4&aqi=yes&alerts=yes`)
        setweatherdata(response.data)
      }catch(error){

      }
    };
    if(location)
    {
      fetchdata();
    }
  },[location])
  const locationchange=(event)=>{
    setlocation(event.target.value)
  }
  return (
    <>
      <div className="app-container">
        <h1 className='app-title'>Weather Condition</h1>
        <div className='input-container'>
          <input type="text"
          className='location-input'
          value={location}
          onChange={locationchange}
          placeholder='Enter the City' />
        </div>
      </div>
      {
        weatherdata && (
          <div className='weather-container'>
            {weatherdata.forecast.forecastday.map((day)=>(
              <div className='day-container' key={day.date}>
                <h2 className='date'> {day.date} </h2>
                <img src={day.day.condition.icon} alt={day.day.condition.text}  className='weather-icon'/>
                <p className='temperature'>{day.day.avgtemp_c} C</p>
                <p className='temperature'>{day.day.condition.text}</p>
              </div>
            ))}
          </div>
        )
      }
    </>
  )
}

export default App
