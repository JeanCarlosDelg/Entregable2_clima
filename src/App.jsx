import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import Loading from './components/Loading'
import FormCountry from './components/FormCountry'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const success = info => {
    setHasError(false)
    setCoords({
      lat: info.coords.latitude,
      lon: info.coords.longitude
    })
  }

  const error = () => {
    setIsLoading(false)
    setHasError(true)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error)
  }, [])

  useEffect(() => {
    if (coords) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${import.meta.env.VITE_API_KEY}`

      axios.get(url)
        .then(res => {

          setWeather(res.data)

          const celsius = (res.data.main.temp - 273.15).toFixed(1)

          const fahrenheit = ((9 / 5 * celsius) + 32).toFixed(1)

          setTemp({
            celsius,
            fahrenheit
          })
        })

        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    }
  }, [coords])

  return (
    <div className='app'>
      <h1 className='weather__title'>Weather App</h1>
      {
        isLoading
          ? <Loading />
          : hasError
            ? <h2>Error</h2>
            : (
              <WeatherCard
                weather={weather}
                temp={temp}
              />
            )
      }
      <div className='form'>
        <h4 className='form__subTitle'>Buscar en otras ubicaciones</h4>
        <FormCountry
          setWeather={setWeather}
          setTemp={setTemp}
        />
      </div>
    </div>
  )
}

export default App
