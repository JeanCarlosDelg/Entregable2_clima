import React, { useEffect, useRef, useState } from 'react'
import './styles/FormCountry.css'
import axios from 'axios'

const FormCountry = ({ setWeather, setTemp }) => {

  const apiKey = 'da0b357dad782b8709b3a27c6778485e'

  const inputSearch = useRef()
  const api_weather = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&lang=es&q=`

  const [city, setCity] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('submit')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        setWeather(response.data);

        const celsius = (response.data.main.temp - 273.15).toFixed(1)

        const fahrenheit = ((9 / 5 * celsius) + 32).toFixed(1)

        setTemp({
          celsius,
          fahrenheit
        })

      } catch (error) {
        console.error('Error al obtener datos meteorológicos', error);
      }
    };

    if (city) {
      fetchData();
    }

  }, [city, apiKey]);

  return (
    <form className='form__container' onSubmit={handleSubmit} autoComplete='off'>
      <input
        className='form__input'
        placeholder='Ciudad'
        type="text"
        required
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
    </form>
  )
}

export default FormCountry